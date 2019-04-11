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
      'branches': 60,
      'functions': 60,
      'lines': 60,
      'statements': 60
    }
  },
  'collectCoverageFrom': [
    'src/**/!(*spec){js,ts}',
  ]
};
