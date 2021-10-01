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
      let secName = await page.evaluate((j) => {
        const s = document.querySelectorAll(".nav-link-list--item button")[j];
        const secName = s.textContent;
        c.click();
        return secName;
      }, j);

      await page.evaluate(() => {
        let cats = document.querySelectorAll(".nav-link-list--item a");
        let catKV = {};
        for (const cat of cats) {
          let catName = sec.textContent.replace("chevron_right", "").trim();
          let url = cat.href + "?lang=en";
          data.push({
            gender: gName,
            section: secName,
            category: catName,
            url: url,
          });
        }
        document.querySelectorAll(".nav-back-link")[1].click();
      });
    }

    await page.evaluate(() => {
      document.querySelectorAll(".nav-back-link")[0].click();
    });
  }

  return data;
};

module.exports = { scrapeCat };
