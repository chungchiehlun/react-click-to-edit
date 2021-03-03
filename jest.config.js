module.exports = {
  preset: "ts-jest",
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js"
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  // https://jestjs.io/docs/en/configuration.html#snapshotserializers-array-string
  snapshotSerializers: ["enzyme-to-json/serializer"],
  roots: ["<rootDir>/src/"]
};
