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
    '/src/bootstrap/'
  ],
  'coverageThreshold': {
    'global': {
      'branches': 100,
      'functions': 100,
      'lines': 100,
      'statements': 100
    }
  },
  'collectCoverageFrom': [
    'src/**/!(*spec){js,ts}',
  ]
};
