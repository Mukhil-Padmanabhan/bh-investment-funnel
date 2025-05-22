// jest.config.js
// eslint-disable-next-line @typescript-eslint/no-require-imports
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/e2e/'],
  moduleNameMapper: {
    // Order is important: specific matches first.
    // These align with paths relative to <rootDir>/src/
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
    // General @/* alias (if not caught by more specific ones above)
    // This must come after more specific @/ rules if they don't include /src/ explicitly
    // or if you want it as a general fallback for other things in src.
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  // If you have top-level directories like 'types' not in 'src' but aliased
  // e.g., tsconfig path "@customtypes/*": ["types/*"]
  // you would add: '^@customtypes/(.*)$': '<rootDir>/types/$1',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);