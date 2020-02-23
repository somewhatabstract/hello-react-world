// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

// eslint-disable-next-line no-undef
module.exports = {
    testMatch: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[jt]s?(x)",
    ],

    // Automatically restore mocks between every test
    restoreMocks: true,

    // Automatically reset mocks between every test.
    resetMocks: true,

    // The directory where Jest should output its coverage files
    coverageDirectory: "coverage",

    // The test environment that will be used for testing
    testEnvironment: "jsdom-sixteen",

    // Setting this value to "fake" allows the use of fake timers for functions such as "setTimeout"
    timers: "fake",

    // Need to setup enzyme and add some matchers.
    setupFilesAfterEnv: ["./jest.setup.js", "jest-extended", "jest-enzyme"],
};
