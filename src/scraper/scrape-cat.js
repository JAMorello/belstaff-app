const scrapeCat = async (page) => {
  // TODO REMOVE COOKIES AND SHIPPING MODALS
  const deleteModals = async (page) => {
    await page.waitForSelector("#onetrust-consent-sdk");
    await page.evaluate(() => {
      document.querySelector("#onetrust-consent-sdk")?.remove();
      document.querySelector(".modal")?.remove();
    });
  };

  const baseUrl = "https://www.belstaff.com/uk?lang=en";

  await page.goto(baseUrl), { waitUntil: "load", timeout: 0 };
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

    let categories = await (
      await page.$$(".nav-link-list--item button")
    ).length;
    let catKV = {};

    for (let j = 0; j < categories; j++) {
      let catName = await page.evaluate((j) => {
        const c = document.querySelectorAll(".nav-link-list--item button")[j];
        const cName = c.textContent;
        c.click();
        return cName;
      }, j);

      let catData = await page.evaluate(() => {
        let sections = document.querySelectorAll(".nav-link-list--item a");
        let secKV = {};
        for (const sec of sections) {
          let name = sec.textContent.replace("chevron_right", "").trim();
          let url = sec.href;
          secKV[name] = url;
        }
        document.querySelectorAll(".nav-back-link")[1].click();
        return secKV;
      });
      catKV[catName] = catData;
    }

    data.push({ gender: gName, data: catKV });

    await page.evaluate(() => {
      document.querySelectorAll(".nav-back-link")[0].click();
    });
  }

  return data;
};

module.exports = { scrapeCat };
