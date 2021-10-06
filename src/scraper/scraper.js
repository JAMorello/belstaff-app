const puppeteer = require("puppeteer");
const { scrapeCategories } = require("./scrap-categories");
const { scrapeProdLinks } = require("./scrape-prod-links");
const { scrapeProducts } = require("./scrap-products");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const data = await scrapeCategories(page);
  const allProductsLinks = await scrapeProdLinks(page, data);
  const allProductsData = await scrapeProducts(page, allProductsLinks);

  // SAVE IN A JSON FILE
  const allProductsJSON = JSON.stringify(allProductsData);
  var fs = require("fs");
  fs.writeFile("ALLPRODUCTS.json", allProductsJSON, (err) => {
    if (err) console.log(err);
    else {
      console.log("File written successfully");
    }
  });

  await browser.close();
})();
