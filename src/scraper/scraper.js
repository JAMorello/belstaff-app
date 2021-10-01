const puppeteer = require("puppeteer");
const { scrapeCat } = require("./scrap-cat");
const { scrapeProduct } = require("./scrap-product");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const categories = await scrapeCat(page);
  const allProducts = await scrapeProdLinks(page, categories);

  await scrapeProduct(page);

  await browser.close();
})();
