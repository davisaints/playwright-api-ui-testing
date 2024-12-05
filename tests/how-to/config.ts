import { devices } from "@playwright/test";

export const config = {
  name: "how-to",
  testDir: "tests/how-to",
  use: {
    ...devices["Desktop Chrome"],
  },
};
