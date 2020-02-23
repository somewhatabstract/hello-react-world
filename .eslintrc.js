module.exports = {
    parser: "babel-eslint", //"@typescript-eslint/parser",
    plugins: [
        "@typescript-eslint/eslint-plugin",
        "prettier",
        "react",
    ],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier/@typescript-eslint",
        "plugin:react/recommended",
        "plugin:prettier/recommended",
        "prettier/react",
    ],
    "settings": {
        "react": {
            "version": "detect",
        },
    },
};
