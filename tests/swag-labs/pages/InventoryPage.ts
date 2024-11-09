import { Locator, Page } from "@playwright/test";

export class InventoryPage {
  private readonly page: Page;

  private readonly sortSelect: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortSelect = page.locator('[data-test="product-sort-container"]');
  }

  async getAllItemPrices() {
    let allItemPrices = await this.page.$$eval(
      ".inventory_item_price",
      (elements) =>
        elements
          .map((element) => element.textContent?.trim() || "")
          .filter((text) => text)
          .map((element) => parseFloat(element.replace("$", "")))
    );

    return allItemPrices;
  }

  async sortProductsBy(sortOption: SortOption) {
    await this.sortSelect.click();

    await this.sortSelect.selectOption(sortOption);
  }
}
