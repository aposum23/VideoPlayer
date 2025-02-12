const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest" // Указываем Jest, что файлы .ts/.tsx нужно компилировать через ts-jest
  },
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths || {}, { prefix: "<rootDir>/" }),
    "\\.(css|less|sass|scss)$": "identity-obj-proxy" // Маппинг стилей
  }
};
