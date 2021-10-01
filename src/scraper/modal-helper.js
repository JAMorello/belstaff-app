// TODO REMOVE COOKIES AND SHIPPING MODALS
const deleteModals = async (page) => {
  await page.waitForSelector("#onetrust-consent-sdk");
  await page.evaluate(() => {
    document.querySelector("#onetrust-consent-sdk")?.remove();
    document.querySelector(".modal")?.remove();
  });
};

module.exports = { deleteModals };
