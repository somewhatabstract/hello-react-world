module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    node: "12",
                },
            },
        ],
        "@babel/preset-react",
    ],
    sourceMaps: true,
};