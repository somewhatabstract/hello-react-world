// eslint-disable-next-line no-undef
module.exports = {
    presets: [
        [
            "@babel/typescript",
            {
                isTSX: true,
                allExtensions: true,
            },
        ],
        "@babel/preset-env",
        "@babel/preset-react",
    ],
    plugins: [
        "@babel/proposal-class-properties",
        "@babel/proposal-object-rest-spread",
    ],
};
