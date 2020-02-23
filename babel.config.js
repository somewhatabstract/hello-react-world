module.exports = {
    presets: [
        [
            "@babel/typescript",
            {
                isTSX: true,
                allExtensions: true,
            },
        ],
    ],
    plugins: [
        "@babel/proposal-class-properties",
        "@babel/proposal-object-rest-spread",
    ],
};
