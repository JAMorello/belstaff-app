const { deleteModals } = require("./modal-helper");

const scrapeProdLinks = (page, categories) => {
  const fullData = [];

  categories.forEach((obj) => {
    let gender = obj.gender;

    Object.entries(obj.data).forEach((entry) => {
      const [cat, url] = entry;
      if (cat !== "View All") {
        // STARTS SCRAPING
        await page.goto(url);
        await deleteModals(page);

        // document.querySelectorAll(".plp--product-cards a.card")

        let pagination = await page.$(".pagination button");
        while (pagination) {
          await page.click(pagination);
          await page.waitForTimeout(2000);
          pagination = await page.$(".pagination button");
        }

        const allProducts = await page.$$(".plp--product-cards a.card");
        for (const prod of allProducts) {
          let prod_url = prod.getProperty("href");
          fullData.push({ gender: gender, category: cat, prod_url: prod_url });
        }
      }
    });
  });
  return fullData;
};

module.exports = { scrapeProdLinks };
