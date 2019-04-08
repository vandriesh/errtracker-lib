module.exports = {
  'transform': {
    '.(ts|tsx)': 'ts-jest'
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
      'branches': 35,
      'functions': 50,
      'lines': 50,
      'statements': 50
    }
  },
  'collectCoverageFrom': [
    'src/**/!(*spec){js,ts}',
  ]
};
