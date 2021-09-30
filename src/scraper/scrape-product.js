const scrapeProducts = async (page) => {
  // ALLOW INTERCEPTING
  await page.setRequestInterception(true);

  // VARIABLE THAT HOLDS THE DATA FROM THE GRAPHQL
  let productData;

  // TO AVOID REDIRECTIONS
  page.on("request", (request) => {
    try {
      if (request.isNavigationRequest() && request.redirectChain().length)
        request.abort();
      else request.continue();
    } catch (e) {
      console.log("Error catching redirection");
    }
  });
  // TO INTERCEPT ALL GRAPHQL REQUESTS/RESPONSE
  page.on("response", async (response) => {
    try {
      const request = response.request();
      if (request?.url()?.includes("graphql")) {
        const text = await response.text();
        const dataJSON = JSON.parse(text);
        if (!dataJSON.data.collection) {
          productData = dataJSON.data.product.variant;
        }
      }
    } catch (e) {
      console.log("Error while intercepting graphql");
    }
  });

  // TODO REMOVE COOKIES AND SHIPPING MODALS
  const deleteModals = async (page) => {
    await page.waitForSelector("#onetrust-consent-sdk");
    await page.evaluate(() => {
      document.querySelector("#onetrust-consent-sdk")?.remove();
      document.querySelector(".modal")?.remove();
    });
  };

  // GO TO PRODUCT WEBPAGE AND START SCRAPPING
  await page.goto(prodUrl), { waitUntil: "load", timeout: 0 };
  await deleteModals(page);

  // RETRIEVE MORE DATA
  const pageJSON = await page.evaluate(() => {
    return JSON.parse(
      document.querySelectorAll('script[type="application/ld+json"]')[1]
        .innerHTML
    );
  });

  const getSubtitle = (data) => {
    const nodes = data.metafields.edges;
    return nodes[0].node.value;
  };

  const getDescription = (data) => {
    const nodes = data.metafields.edges;
    return nodes[1].node.value;
  };

  const getItemGroupId = (page) => {
    const url = new URL(page.url());
    const id = url.pathname.split("/").slice(-1)[0];
    return id;
  };

  const getBreadcrumbs = async (page) => {
    const bc = await page.evaluate(() => {
      return Array.from(document.querySelectorAll(".breadcrumbs a"), (e) =>
        e.textContent.trim().toLowerCase()
      );
    });
    return bc;
  };

  // GET IMAGES
  const getImages = async (page, scroll) => {
    if (scroll) {
      await page.waitForTimeout(1000);
      let px = await page.evaluate(() => {
        // @ts-ignore
        return document.querySelector(".gallery-wrapper").offsetHeight;
      });
      await page.evaluate((px) => {
        window.scrollBy(0, px);
      }, px);
      await page.waitForTimeout(2000);
      await page.evaluate((px) => {
        window.scrollBy(0, -px);
      }, px);
      await page.waitForTimeout(1000);
    }

    const imgsUrls = await page.evaluate(() => {
      const sources_nodes = Array.from(
        document.querySelectorAll(".gallery-wrapper picture.fullRes source")
      );
      const filter_sources = sources_nodes.filter((e) =>
        // @ts-ignore
        e.getAttribute("media").includes("48rem")
      );
      const got_sources = filter_sources.map((e) => e.getAttribute("srcset"));
      const final_sources = got_sources.map((e) =>
        // @ts-ignore
        e.replace(" 2x", "").split(",")[1].trim()
      );

      return final_sources;
    });
    return imgsUrls;
  };

  // GETBULLETS
  const getBullets = (data) => {
    const nodes = data.productdetails.edges;
    const bullets = [];
    for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i].node;
      // @ts-ignore
      if (node.key.includes("Product")) {
        // @ts-ignore
        bullets.push(node.value);
      }
    }
    return bullets;
  };

  // GET KEY-VALUE PAIRS
  const getKeyValuePairs = (data) => {
    let bullets = getBullets(data);
    const kv = {};
    // @ts-ignore
    bullets = bullets
      // @ts-ignore
      .filter((e) => e.includes(":"))
      // @ts-ignore
      .map((e) => e.split("/"))
      .flat()
      .map((e) => e.split("."))
      .flat()
      .map((e) => e.split(":"));
    for (let i = 0; i < bullets.length; i++) {
      // @ts-ignore
      if (bullets[i].length > 1) {
        kv[bullets[i][0]] = bullets[i][1];
      }
    }
    return kv;
  };

  // GET SUBBRAND/COLLECTION
  const getSubBrand = async (page) => {
    const isSubBrandAvailable = await page.evaluate(() => {
      return document.querySelector(".badge > .overline") !== null;
    });
    if (isSubBrandAvailable) {
      const subBrand = await await page.$eval(
        ".badge > .overline",
        (element) => element.textContent ?? ""
      );
      return subBrand;
    }
    return "";
  };

  // GET GENDER
  const getGender = async (page) => {
    const gender = await page.evaluate(() => {
      // @ts-ignore
      const breadcrumbs = document
        .querySelector(".breadcrumbs")
        ?.textContent.toLowerCase();
      console.log(breadcrumbs);
      // @ts-ignore
      if (breadcrumbs.includes("women")) {
        return "women";
      } else {
        return "men";
      }
    });
    return gender;
  };
  /**
   * Initialize products array
   */
  const products = [];

  /**
   * Iterate over all the variants of the product
   */
  const colors = await page.$$(".colour-swatch--wrapper button");
  const sizes = await page.$$(".size-swatch--sizes-wrapper button");
  // To scroll and let the imgs load
  let scroll = true;

  // FIRST ITERATE THROUGH COLORS
  for (const color of colors) {
    let classData = await color.getProperty("className");
    // @ts-ignore
    classData = await classData.jsonValue();

    // Click if the color buttons is not already selected
    // @ts-ignore
    if (!classData.includes("selected")) {
      await color.click();
    }
    // This small wait is to actually receive the graphql response of the variant
    await page.waitForTimeout(1000);

    // After every iteration, return to true
    scroll = true;

    // FOR EACH COLOR, ITERATE THROUGH SIZES
    for (const size of sizes) {
      let classData = await size.getProperty("className");
      // @ts-ignore
      classData = await classData.jsonValue();
      // Click if the size buttons is not already selected
      // @ts-ignore
      if (!classData.includes("selected")) {
        await size.click();
      }
      // This small wait is to actually receive the graphql response of the variant
      await page.waitForTimeout(1000);

      // CREATE NEW PRODUCT AND START TO POPULATE IT
      // @ts-ignore
      const id = productData.sku;
      const title = await page.$eval(".product-info--details--titles h1", (e) =>
        e.textContent.toUpperCase()
      );
      const url = page.url();

      // @ts-ignore
      const product = { id, title, url };

      product.subTitle = getSubtitle(productData);
      product.description = getDescription(productData);
      product.images = await getImages(page, scroll);
      product.currency = productData.priceV2.currencyCode;
      product.sku = productData.sku;
      product.brand = pageJSON.brand.name;
      product.subBrand = await getSubBrand(page);
      product.size = productData.selectedOptions[0].value;
      product.realPrice = productData.priceV2.amount;
      product.availability = productData.availableForSale;
      product.itemGroupId = getItemGroupId(page);
      product.color = productData.selectedOptions[1].value;
      product.gender = await getGender(page);
      product.breadcrumbs = await getBreadcrumbs(page);
      product.bullets = getBullets(productData);
      product.keyValuePairs = getKeyValuePairs(productData);

      products.push(product);

      // After first variant, false -> later will turn true again
      scroll = false;
    }
  }

  return products;
};

module.exports = { scrapProducts };
