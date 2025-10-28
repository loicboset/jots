// jest.config.mjs

import dotenv from 'dotenv';

// ✅ Load environment variables for test environment
if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: '.env.test' });
}

// ✅ Proper ESM export — not module.exports
const config = {
  projects: [
    {
      displayName: 'server',
      testMatch: [
        '<rootDir>/src/__tests__/server/*.test.(js|ts)',
        '<rootDir>/src/__tests__/server/**/*.test.(js|ts)',
      ],
      testEnvironment: 'node',
      moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '^@/(.*)$': '<rootDir>/src/$1',
      },
      transform: {
        '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { configFile: './jest.babel.config.js' }],
      },
      moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
      transformIgnorePatterns: ['/node_modules/(?!(@next|next))/'],
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
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '^@/(.*)$': '<rootDir>/src/$1',
      },
      transform: {
        '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { configFile: './jest.babel.config.js' }],
      },
      moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
      transformIgnorePatterns: ['/node_modules/(?!(@next|next))/'],
    },
  ],
};

export default config;
