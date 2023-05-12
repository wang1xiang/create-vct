export const packages = {
  "@typescript-eslint/eslint-plugin": "^5.59.1",
  "@typescript-eslint/parser": "^5.59.1",
  "eslint-plugin-react": "^7.32.2",
};

export const eslintOverrides = [
  {
    files: ["*.js"],
    extends: ["eslint:recommended", "plugin:prettier/recommended"],
  },
  {
    files: ["*.ts", "*.tsx"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
      "plugin:prettier/recommended",
    ],
    rules: {
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-explicit-any": "off"
    },
  },
];
