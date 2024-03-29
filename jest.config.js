module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleDirectories: ['node_modules'],
  testPathIgnorePatterns: ['/node_modules/', '/lib/', '/es/', '/examples/'],
  transform: {
    '\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  testRegex: ['/__tests__/.*\\.(ts|tsx|js)$', '/*.test\\.(ts|tsx|js)$'],
  testEnvironment: 'jsdom',
}
