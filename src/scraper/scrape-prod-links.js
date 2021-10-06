const { deleteModals } = require("./modal-helper");

const scrapeProdLinks = (page, data) => {
  const fullData = [];

  for (const item of data) {
    if (item.category !== "View All" && !item.url.includes("women/aw21")) {
      await page.goto(item.url, { waitUntil: "load", timeout: 0 });
      await deleteModals(page);

      let pagination = !!(await page.$(".pagination button"));
      while (pagination) {
        await page.evaluate(() => {
          document.querySelector(".pagination button").click();
        });
        await page.waitForTimeout(1500);
        pagination = await page.evaluate(() => {
          return !!document.querySelector(".pagination button");
        });
      }

      const allUrls = await page.$$eval(".plp--product-cards a.card", (e) =>
        e.map((e) => e.href)
      );
      for (const prod_url of allUrls) {
        fullData.push({
          ...item,
          prod_url: prod_url + "&lang=en",
        });
      }
    }
  }
  return fullData;
};

module.exports = { scrapeProdLinks };
