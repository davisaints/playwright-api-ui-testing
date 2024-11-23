import { devices } from "@playwright/test";

export const config = {
  name: "restful-booker",
  testDir: "tests/restful-booker",
  use: {
    ...devices["Desktop Chrome"],
  },
};
