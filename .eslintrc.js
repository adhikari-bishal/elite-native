module.exports = {
    parser: '@babel/eslint-parser',
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'prettier'
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        requireConfigFile: false,
        babelOptions: {
            presets: ['@babel/preset-react']
        }
    },
    plugins: ['react'],
    rules: {
        'indent': ['error', 4, {SwitchCase: 1, ignoredNodes: ['ConditionalExpression']}],
        'linebreak-style': ['error', 'unix'],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always']
    },
    settings: {
        react: {
            version: 'detect'
        }
    },
    globals: {
        require: true
    }
};
