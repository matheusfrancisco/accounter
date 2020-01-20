module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "testMatch": [
    "**/test/**/*.test.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
}
