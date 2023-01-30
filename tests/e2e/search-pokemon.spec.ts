import { test, expect } from "@playwright/test";

test("should seach a gengar and navigate to its page", async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto("http://localhost:3000/");

  await page.locator("input#search-input").type("gengar");
  await page.locator("button").click();
  await page.locator(`.card-gengar`).click();
  await expect(page.locator("h3")).toContainText("GENGAR");
});
