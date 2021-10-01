const { deleteModals } = require("./modal-helper");

const scrapeCat = async (page) => {
  const baseUrl = "https://www.belstaff.com/uk?lang=en";

  await page.goto(baseUrl, { waitUntil: "load", timeout: 0 });
  await deleteModals(page);

  const data = [];

  await page.click(".title-bar button");
  const genders = await (await page.$$(".nav-link-list--item button")).length;

  for (let i = 0; i < genders; i++) {
    let gName = await page.evaluate((i) => {
      const g = document.querySelectorAll(".nav-link-list--item button")[i];
      const gName = g.textContent;
      g.click();
      return gName;
    }, i);

    let section = await (await page.$$(".nav-link-list--item button")).length;

    for (let j = 0; j < section; j++) {
      const secName = await page.evaluate((j) => {
        const s = document.querySelectorAll(".nav-link-list--item button")[j];
        const secName = s.textContent;
        s.click();
        return secName;
      }, j);

      const arrKV = await page.$$eval(".nav-link-list--item a", (e) =>
        e.map((e) => {
          let catName = e.textContent.replace("chevron_right", "").trim();
          let url = e.href + "?lang=en";
          return { category: catName, url: url };
        })
      );

      await page.evaluate(() => {
        document.querySelectorAll(".nav-back-link")[1].click();
      });

      for (const secData of arrKV) {
        data.push({
          gender: gName,
          section: secName,
          category: secData.category,
          url: secData.url,
        });
      }
    }

    await page.evaluate(() => {
      document.querySelectorAll(".nav-back-link")[0].click();
    });
  }

  return data;
};

module.exports = { scrapeCat };
