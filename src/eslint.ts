// @ts-nocheck
import * as babel from '@babel/core'
import { blankLine, eslintImport, eslintPluginCall } from './ast.js'
export const commonPackages = {
  husky: '^8.0.3',
  'lint-staged': '^13.2.2',
  '@commitlint/cli': '^17.6.3',
  '@commitlint/config-conventional': '^17.6.3',
  eslint: '^8.39.0',
  prettier: '^2.8.8',
  'eslint-config-prettier': '^8.8.0',
  'eslint-plugin-prettier': '^4.2.1',
  'vite-plugin-eslint': '^1.8.1',
}

export const eslintConfig = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  overrides: [],
}

export const prettierConfig = {
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
}

export const eslintIgnore = ['node_modules', 'dist']

export const packageScripts = {
  "prepare": "npx husky install"
}
export const packageMore = {
  "src/**/*.{js,jsx,ts,tsx,json,md}": [
    "eslint --fix --max-warnings=0",
    "prettier --write"
  ],
  "src/**/*.{scss,less,css}": [
    "prettier --write"
  ],
}

export function viteEslint(code) {
  const ast = babel.parseSync(code, {
    sourceType: 'module',
    comments: false,
  })
  const { program } = ast

  const importList = program.body
    .filter((body) => {
      return body.type === 'ImportDeclaration'
    })
    .map((body) => {
      delete body.trailingComments
      return body
    })

  if (importList.find((body) => body.source.value === 'vite-plugin-eslint')) {
    return code
  }

  const nonImportList = program.body.filter((body) => {
    return body.type !== 'ImportDeclaration'
  })
  const exportStatement = program.body.find(
    (body) => body.type === 'ExportDefaultDeclaration'
  )

  if (exportStatement.declaration.type === 'CallExpression') {
    const [argument] = exportStatement.declaration.arguments
    if (argument.type === 'ObjectExpression') {
      const plugin = argument.properties.find(
        ({ key }) => key.name === 'plugins'
      )

      if (plugin) {
        plugin.value.elements.push(eslintPluginCall)
      }
    }
  }

  importList.push(eslintImport)
  importList.push(blankLine)
  program.body = importList.concat(nonImportList)

  ast.program = program

  return babel.transformFromAstSync(ast, code, { sourceType: 'module' }).code
}
