export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.[t|j]s?$': 'babel-jest'
  },
  transformIgnorePatterns: ['/node_modules/(?!chalk).+\\.js$'],
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'babel-jest'
  },
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json'
    }
  }
};
