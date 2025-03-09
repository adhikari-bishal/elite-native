export default {
    env: {
        browser: true,
        es2021: true,
        node: true,
        "react-native/react-native": true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-native/all",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "plugin:prettier/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: [
        "react",
        "react-native",
        "@typescript-eslint",
        "jsx-a11y",
        "import",
    ],
    rules: {
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/no-unused-vars": ["warn", {argsIgnorePattern: "^_"}],
        "react-native/no-inline-styles": "off",
        "react-native/no-color-literals": "off",
    },
    settings: {
        react: {
            version: "detect",
        },
    },
};
