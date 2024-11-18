// const config = {
//   testEnviroment: 'node',
//   // verbose: true,
//   // collectCoverage: true,
//   // coveragePathIgnorePatterns: ['/node_modules/'],
// };

// export default config;

import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};

export default config;
