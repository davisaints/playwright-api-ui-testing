import dotenv from "dotenv";
dotenv.config();

import { defineConfig } from "@playwright/test";

import { config as howToConfig } from "./tests/how-to/config";
import { config as swagLabsConfig } from "./tests/swag-labs/config";
import { config as restfulBookerConfig } from "./tests/restful-booker/config";

export default defineConfig({
  expect: {
    timeout: 15 * 1000,
  },
  forbidOnly: !!process.env.CI,
  projects: [howToConfig, swagLabsConfig, restfulBookerConfig],
  reporter: [
    [
      "junit",
      {
        outputFile: "test-results/TEST-playwright.xml",
      },
    ],
  ],
  retries: process.env.CI ? 2 : 0,
  testDir: "./tests",
  timeout: 100 * 1000,
  use: {
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  workers: 1,
});
