/* ts-ignore */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import spawn from 'cross-spawn'
import minimist from 'minimist'
import prompts from 'prompts'
import {
  commonPackages,
  eslintConfig,
  eslintIgnore,
  prettierConfig,
  viteEslint,
} from './eslint'
import { blue, green, red, reset, yellow } from 'kolorist'

// 解析命令行传入的参数为 {_: [], template: ''}格式
const argv = minimist<{
  t?: string
  template?: string
}>(process.argv.slice(2), { string: ['_'] })
const cwd = process.cwd()

const variants: any[] = [
  {
    name: 'react',
    display: 'JavaScript',
    color: yellow,
  },
  {
    name: 'react-ts',
    display: 'TypeScript',
    color: blue,
  },
  {
    name: 'react-swc',
    display: 'JavaScript + SWC',
    color: yellow,
  },
  {
    name: 'react-swc-ts',
    display: 'TypeScript + SWC',
    color: blue,
  },
  {
    name: 'custom-create-react',
    display: 'Customize with create-react ↗',
    color: green,
    customCommand: 'npx create-react-app TARGET_DIR',
  },
]
const variantNames = variants.map((v) => v.name)

const renameFiles: Record<string, string | undefined> = {
  _gitignore: '.gitignore',
}

const defaultTargetDir = 'react-project'

async function init() {
  // 获取传入的第一个参数 去除前后空格以及末尾的/
  const argTargetDir = formatTargetDir(argv._[0])
  // 获取传入的模板
  const argTemplate = argv.template || argv.t
  // 确定输出目录
  let targetDir = argTargetDir || defaultTargetDir
  const getProjectName = () =>
    targetDir === '.' ? path.basename(path.resolve()) : targetDir

  // 通过询问得到用户输入的projectName' | 'overwrite' | 'packageName' 这几个参数
  let result: prompts.Answers<
    | 'projectName'
    | 'overwrite'
    | 'packageName'
    | 'variant'
    | 'isRouter'
    | 'isAntd'
    | 'isEslint'
    | 'isRedux'
  >

  // 如果用户传入参数并且符合规则时 就不会进入询问
  try {
    result = await prompts(
      [
        // 获取用户输入的文件名并作为最终输出目录
        {
          type: argTargetDir ? null : 'text',
          name: 'projectName',
          message: reset('Project name:'),
          initial: defaultTargetDir,
          onState: (state) => {
            targetDir = formatTargetDir(state.value) || defaultTargetDir
          },
        },
        // 当目录存在或目录不为空时 询问是否覆盖掉
        {
          type: () =>
            !fs.existsSync(targetDir) || isEmpty(targetDir) ? null : 'confirm',
          name: 'overwrite',
          message: () =>
            (targetDir === '.'
              ? 'Current directory'
              : `Target directory "${targetDir}"`) +
            ` is not empty. Remove existing files and continue?`,
        },
        // 二次确认是否输入的y 如果输入N（false）时直接退出
        {
          type: (_, { overwrite }: { overwrite?: boolean }) => {
            if (overwrite === false) {
              throw new Error(red('✖') + ' Operation cancelled')
            }
            return null
          },
          name: 'overwriteChecker',
          message: '',
        },
        // 判断输入的项目名是否符合 package.json 的命名规范
        {
          type: () => (isValidPackageName(getProjectName()) ? null : 'text'),
          name: 'packageName',
          message: reset('Package name:'),
          initial: () => toValidPackageName(getProjectName()),
          validate: (dir) =>
            isValidPackageName(dir) || 'Invalid package.json name',
        },
        // 通过--template传入模板存在时 不询问 否则让用户选择
        {
          type:
            argTemplate && variantNames.includes(argTemplate) ? null : 'select',
          name: 'variant',
          message:
            typeof argTemplate === 'string' &&
            !variantNames.includes(argTemplate)
              ? reset(
                  `"${argTemplate}" isn't a valid template. Please choose from below: `
                )
              : reset('Select a variant:'),
          initial: 0,
          choices: variants.map((variant) => {
            const variantColor = variant.color
            return {
              title: variantColor(variant.display || variant.name),
              value: variant,
            }
          }),
        },
        {
          type: () => 'confirm',
          name: 'isEslint',
          message: 'Add ESLint & Prettier for code quality?',
        },
        {
          type: () => 'confirm',
          name: 'isAntd',
          message: 'Add Ant design for UI library?',
        },
        {
          type: () => 'confirm',
          name: 'isRouter',
          message: 'Add React Router for Single Page Application development?',
        },
        {
          type: () => 'confirm',
          name: 'isRedux',
          message: 'Add Redux Toolkit for state management tool?',
        },
      ],
      {
        onCancel: () => {
          throw new Error(red('✖') + ' Operation cancelled')
        },
      }
    )
  } catch (cancelled: any) {
    console.log(cancelled.message)
    return
  }

  // 与提示关联的用户选择
  const { overwrite, packageName, variant, isEslint, isAntd, isRouter, isRedux } = result

  // 最终输出文件的目录
  const root = path.join(cwd, targetDir)

  // 覆盖已有非空目录 或 创建空白目录
  if (overwrite) {
    emptyDir(root)
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true })
  }

  // 确定模板
  let template: string = variant?.name || argTemplate
  let isReactSwc = false
  // 是否包含swc https://cn.vitejs.dev/plugins/#vitejsplugin-react-swc
  if (template.includes('-swc')) {
    isReactSwc = true
    template = template.replace('-swc', '')
  }

  // process.env.npm_config_user_agent = npm/8.19.3 node/v16.19.1 darwin arm64 workspaces/false
  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent)
  // 当前的包管理器
  const pkgManager = pkgInfo ? pkgInfo.name : 'npm'
  // 是否是yarn 1.x版本
  const isYarn1 = pkgManager === 'yarn' && pkgInfo?.version.startsWith('1.')

  const { customCommand } = variants.find((v) => v.name === template) ?? {}

  // 拿到自定义命令 如：create-vue npm create vue@latest TARGET_DIR
  if (customCommand) {
    const fullCustomCommand = customCommand
      .replace(/^npm create/, `${pkgManager} create`)
      // Only Yarn 1.x doesn't support `@version` in the `create` command
      .replace('@latest', () => (isYarn1 ? '' : '@latest'))
      .replace(/^npm exec/, () => {
        // Prefer `pnpm dlx` or `yarn dlx`
        if (pkgManager === 'pnpm') {
          return 'pnpm dlx'
        }
        if (pkgManager === 'yarn' && !isYarn1) {
          return 'yarn dlx'
        }
        // Use `npm exec` in all other cases,
        // including Yarn 1.x and other custom npm clients.
        return 'npm exec'
      })

    const [command, ...args] = fullCustomCommand.split(' ')
    // 替换TARGET_DIR为真实路径
    const replacedArgs = args.map((arg: string) =>
      arg.replace('TARGET_DIR', targetDir)
    )

    // 通过spawn.sync执行此命令
    const { status } = spawn.sync(command, replacedArgs, {
      // stdio: 'inherit'意思是继承：子进程继承当前进程的输入输出 并将输出信息同步输出在当前进程上
      stdio: 'inherit',
    })
    process.exit(status ?? 0)
  }

  console.log(`\nScaffolding project in ${root}...`)

  // 确认模板路径
  const templateDir = path.resolve(
    // file:///Users/xiangwang/My/github/create-vite-analysis/src/index.ts
    // @ts-ignore
    fileURLToPath(import.meta.url),
    '../..',
    `template-${template}`
  )
  // 写入文件 package.json要修改name字段使用writeFileSync 其他直接copy
  const write = (file: string, dir = templateDir, content?: string) => {
    const targetPath = path.join(root, renameFiles[file] ?? file)
    if (content) {
      fs.writeFileSync(targetPath, content)
    } else {
      // 复制文件/文件夹
      copy(path.join(dir, file), targetPath)
    }
  }

  // 获取模板下的文件 将除了package.json的文件全部复制到输出目录中
  const files = fs.readdirSync(templateDir)
  for (const file of files.filter((f) => f !== 'package.json')) {
    write(file)
  }

  // 通过readFileSync拿到package.json文件内容 并通过JSON.parse处理
  const pkg = JSON.parse(
    fs.readFileSync(path.join(templateDir, `package.json`), 'utf-8')
  )

  // 替换name为项目名称
  pkg.name = packageName || getProjectName()

  write('package.json', templateDir, JSON.stringify(pkg, null, 2) + '\n')

  // 选择的是react swc模板时 替换插件
  if (isReactSwc) {
    setupReactSwc(root, template.endsWith('-ts'))
  }

  // 确认模板路径
  const targetPath = path.resolve(
    // file:///Users/xiangwang/My/github/create-vite-analysis/src/index.ts
    // @ts-ignore
    fileURLToPath(import.meta.url),
    '../..',
    `${targetDir}`
  )
  // eslint配置
  if (isEslint) {
    const eslintFile = path.join(targetPath, '.eslintrc.json')
    const prettierFile = path.join(targetPath, '.prettierrc.json')
    const eslintIgnoreFile = path.join(targetPath, '.eslintignore')
    const { packages, eslintOverrides } = await import(
      `../eslint-templates/${template}.js`
    )

    const packageList = { ...commonPackages, ...packages }
    const eslintConfigOverrides = [
      ...eslintConfig.overrides,
      ...eslintOverrides,
    ]
    const eslint = { ...eslintConfig, overrides: eslintConfigOverrides }

    const viteConfigFiles = ['vite.config.js', 'vite.config.ts']
    const [viteFile] = viteConfigFiles
      .map((file) => path.join(targetPath, file))
      .filter((file) => fs.existsSync(file))

    const viteConfig = viteEslint(fs.readFileSync(viteFile, 'utf8'))

    fs.writeFileSync(eslintFile, JSON.stringify(eslint, null, 2))
    fs.writeFileSync(prettierFile, JSON.stringify(prettierConfig, null, 2))
    fs.writeFileSync(eslintIgnoreFile, eslintIgnore.join('\n'))
    fs.writeFileSync(viteFile, viteConfig)
    pkg.devDependencies = { ...pkg.devDependencies, ...packageList }

    write('package.json', templateDir, JSON.stringify(pkg, null, 2) + '\n')
  }
  // antd配置
  if (isAntd) {
    const AppComponent = path.join(targetPath, './src/App.tsx')
    const MainComponent = path.join(targetPath, './src/Main.tsx')
    // 获取模板下的文件 将除了package.json的文件全部复制到输出目录中
    const files = fs.readdirSync(templateDir)
    for (const file of files.filter((f) => f !== 'package.json')) {
      write(file)
    }
    // @ts-ignore
    const { packages, App, Main } = await import('../antd-templates/index.js')
    fs.writeFileSync(AppComponent, App)
    fs.writeFileSync(MainComponent, Main)

    pkg.dependencies = { ...pkg.dependencies, ...packages }
    write('package.json', templateDir, JSON.stringify(pkg, null, 2) + '\n')
  }
  // react-router
  if (isRouter) {
    const routeTemplate = path.resolve(
      // @ts-ignore
      fileURLToPath(import.meta.url),
      '../../router-templates'
    )
    // 获取模板下的文件 将除了package.json的文件全部复制到输出目录中
    const files = fs.readdirSync(routeTemplate)
    for (const file of files.filter((f) => f !== 'index.js')) {
      write(file, routeTemplate)
    }
    const AppComponent = path.join(targetPath, './src/App.tsx')
    const MainComponent = path.join(targetPath, './src/Main.tsx')
    // @ts-ignore
    const { packages, App, Main } = await import('../router-templates/index.js')
    fs.writeFileSync(AppComponent, App)
    fs.writeFileSync(MainComponent, Main)

    pkg.dependencies = { ...pkg.dependencies, ...packages }
    write('package.json', templateDir, JSON.stringify(pkg, null, 2) + '\n')
  }
  // redux toolkit
  if (isRedux) {
    const reduxTemplate = path.resolve(
      // @ts-ignore
      fileURLToPath(import.meta.url),
      '../../redux-templates'
    )
    // 获取模板下的文件 将除了package.json的文件全部复制到输出目录中
    const files = fs.readdirSync(reduxTemplate)
    for (const file of files.filter((f) => f !== 'index.js')) {
      write(file, reduxTemplate)
    }
    const AppComponent = path.join(targetPath, './src/App.tsx')
    const MainComponent = path.join(targetPath, './src/Main.tsx')
    // @ts-ignore
    const { packages, App, Main } = await import('../redux-templates/index.js')
    fs.writeFileSync(AppComponent, App)
    fs.writeFileSync(MainComponent, Main)

    pkg.dependencies = { ...pkg.dependencies, ...packages }
    write('package.json', templateDir, JSON.stringify(pkg, null, 2) + '\n')
  }
  // 输出
  // cd ...
  // npm install
  // npm run dev
  const cdProjectName = path.relative(cwd, root)
  console.log(`\nDone. Now run:\n`)
  if (root !== cwd) {
    console.log(
      `  cd ${
        cdProjectName.includes(' ') ? `"${cdProjectName}"` : cdProjectName
      }`
    )
  }
  switch (pkgManager) {
    default:
      console.log('  yarn')
      console.log('  yarn dev')
      break
  }
  console.log()
}

function formatTargetDir(targetDir: string | undefined) {
  return targetDir?.trim().replace(/\/+$/g, '')
}
// 复制文件/文件夹
function copy(src: string, dest: string) {
  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    copyDir(src, dest)
  } else {
    fs.copyFileSync(src, dest)
  }
}

function isValidPackageName(projectName: string) {
  return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(
    projectName
  )
}

function toValidPackageName(projectName: string) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z\d\-~]+/g, '-')
}

function copyDir(srcDir: string, destDir: string) {
  fs.mkdirSync(destDir, { recursive: true })
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file)
    const destFile = path.resolve(destDir, file)
    copy(srcFile, destFile)
  }
}

// 目录是否为空 文件数为0 或者只存在.git
function isEmpty(path: string) {
  const files = fs.readdirSync(path)
  return files.length === 0 || (files.length === 1 && files[0] === '.git')
}
// 清空目录 如果是.git时 不做处理
function emptyDir(dir: string) {
  if (!fs.existsSync(dir)) {
    return
  }
  for (const file of fs.readdirSync(dir)) {
    if (file === '.git') {
      continue
    }
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true })
  }
}

// 通过 process.env.npm_config_user_agent 获取到当前运行脚本的包管理器和版本号
function pkgFromUserAgent(userAgent: string | undefined) {
  if (!userAgent) return undefined
  const pkgSpec = userAgent.split(' ')[0]
  const pkgSpecArr = pkgSpec.split('/')
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  }
}
// 替换 package.json、vite.config.js/ts中对应插件为swc插件
function setupReactSwc(root: string, isTs: boolean) {
  editFile(path.resolve(root, 'package.json'), (content) => {
    return content.replace(
      /"@vitejs\/plugin-react": ".+?"/,
      `"@vitejs/plugin-react-swc": "^3.0.0"`
    )
  })
  editFile(
    path.resolve(root, `vite.config.${isTs ? 'ts' : 'js'}`),
    (content) => {
      return content.replace('@vitejs/plugin-react', '@vitejs/plugin-react-swc')
    }
  )
}
function editFile(file: string, callback: (content: string) => string) {
  const content = fs.readFileSync(file, 'utf-8')
  fs.writeFileSync(file, callback(content), 'utf-8')
}

init().catch((e) => {
  console.error(e)
})
