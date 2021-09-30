const puppeteer = require("puppeteer");
const { scrapeProducts } = require("./scrap-products");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await scrapeProducts(page);

  await browser.close();
})();
