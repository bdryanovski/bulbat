module.exports = {
  "roots": ["<rootDir>/src"],
  "transform": {
    "^.+\\.(t|j)s?$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  "moduleFileExtensions": ["ts", "tsx", "js", "jsx", "json", "node"]
}