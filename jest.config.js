module.exports = {
  projects: [
    {
      displayName: 'server',
      testMatch: [
        '<rootDir>/src/__tests__/server/*.test.(js|ts)',
        '<rootDir>/src/__tests__/server/**/*.test.(js|ts)',
      ],
      testEnvironment: 'node',
      moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock styles
        '^@/(.*)$': '<rootDir>/src/$1',
      },
      transform: {
        '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { configFile: './jest.babel.config.js' }], // Ensure Babel handles all JS/TS/JSX/TSX files
      },
      moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
      transformIgnorePatterns: ['/node_modules/(?!(@next|next))/'], // Make sure to transpile Next.js and related modules
    },
    {
      displayName: 'client',
      setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
      testMatch: [
        '<rootDir>/src/__tests__/client/*.test.(js|ts|jsx|tsx)',
        '<rootDir>/src/__tests__/client/**/*.test.(js|ts|jsx|tsx)',
      ],
      testEnvironment: 'jsdom',
      moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock styles
        '^@/(.*)$': '<rootDir>/src/$1',
      },
      transform: {
        '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { configFile: './jest.babel.config.js' }], // Ensure Babel handles all JS/TS/JSX/TSX files
      },
      moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
      transformIgnorePatterns: ['/node_modules/(?!(@next|next))/'], // Make sure to transpile Next.js and related modules
    },
  ],
};
