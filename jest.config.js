module.exports = {
  rootDir: './',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json'
    }
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)?$': 'ts-jest',
  },
  moduleDirectories: ["node_modules", "apps"],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx', 'json'],
  testMatch: ["**/*.test.[jt]s?(x)"],
  transformIgnorePatterns: [
    '/node_modules/(?!(@storybook/.[jt]s?(x)$))',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
