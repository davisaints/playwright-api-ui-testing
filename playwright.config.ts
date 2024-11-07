import dotenv from "dotenv";
dotenv.config();

import { defineConfig } from "@playwright/test";

import { config as swagLabs } from "./tests/swag-labs/config";

export default defineConfig({
  expect: {
    timeout: 15 * 1000,
  },
  forbidOnly: !!process.env.CI,
  projects: [swagLabs],
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
  timeout: 30 * 1000,
  use: {
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  workers: 1,
});
