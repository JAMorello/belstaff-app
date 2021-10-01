const puppeteer = require("puppeteer");
const { scrapeCat } = require("./scrap-cat");
const { scrapeProduct } = require("./scrap-product");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const data = await scrapeCat(page);
  const allProductsLinks = await scrapeProdLinks(page, data);

  await scrapeProduct(page);

  await browser.close();
})();
