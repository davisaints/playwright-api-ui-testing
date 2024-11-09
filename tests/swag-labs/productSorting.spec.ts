import { expect, mergeTests } from "@playwright/test";
import { swagLabsPagesTest } from "./fixtures/swagLabsPagesTest";

export const test = mergeTests(swagLabsPagesTest);

function checkSorted(arr: number[]): boolean {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return false;
    }
  }
  return true;
}

test.beforeEach(async ({ loginPage }) => {
  await test.step("Given the user navigates to the login page", async () => {
    await loginPage.goToLoginPage();
  });

  await test.step("And the user logs in as 'Standard user'", async () => {
    await loginPage.loginAs("Standard user");
  });
});

test.describe("Product sorting functionality", () => {
  test("User should see products sorted by price from low to high", async ({
    inventoryPage,
  }) => {
    await test.step("When the user sorts the products by 'Price (low to high)'", async () => {
      await inventoryPage.sortProductsBy("Price (low to high)");
    });

    await test.step("Then the products should be sorted in ascending order of price", async () => {
      const allPrices = await inventoryPage.getAllItemPrices();

      const isSorted = checkSorted(allPrices);
      expect(isSorted).toBeTruthy();
    });
  });

  test("User should see products sorted by price from high to low", async ({
    inventoryPage,
  }) => {
    await test.step("When the user sorts the products by 'Price (high to low)'", async () => {
      await inventoryPage.sortProductsBy("Price (high to low)");
    });

    await test.step("Then the products should be sorted in descending order of price", async () => {
      const allPrices = await inventoryPage.getAllItemPrices();

      const isSorted = checkSorted(allPrices);
      expect(isSorted).toBeFalsy();
    });
  });
});
