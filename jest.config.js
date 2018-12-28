module.exports = {
  'transform': {
    '.(ts|tsx)': '<rootDir>/node_modules/ts-jest/preprocessor.js'
  },
  'testRegex': '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  'moduleFileExtensions': [
    'ts',
    'tsx',
    'js'
  ],
  'coveragePathIgnorePatterns': [
    '/node_modules/',
  ],
  'coverageThreshold': {
    'global': {
      'branches': 50,
      'functions': 50,
      'lines': 50,
      'statements': 50
    }
  },
  'collectCoverageFrom': [
    'src/**/!(*spec){js,ts}',
  ]
};
