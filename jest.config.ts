import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  collectCoverage: true,
  preset: 'ts-jest',
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  testMatch: ['<rootDir>/**/*.test.ts'],
};

export default config;
