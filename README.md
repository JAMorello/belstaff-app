# Belstaff App - A scraper and React application!

![Belstaff](/readme-assets/belstaff-banner.jpg)

[![Netlify Status](https://api.netlify.com/api/v1/badges/cd392f12-d03e-497c-8f6a-1ca4c51de4c7/deploy-status)](https://app.netlify.com/sites/festive-lamport-c8f2a2/deploys)
This is the repository of the [Belstaff App](https://festive-lamport-c8f2a2.netlify.app).

The application was created after participating in a paid challenge offered by Scale AI, who were in search of applicants for an important project. That challenge consisted in developing a scraper that retrieves data (and metadata) of products (mainly clothing) from the official website of the brand [Belstaff](https://www.belstaff.com/uk). With some variations in the data extracted and the scope, the same scraper later was used to create this app.

In this repository you'll find the code of both the scraper and the React application.

The libraries used are: [Puppeteer](https://github.com/puppeteer/puppeteer) for the scraper, [React](https://es.reactjs.org/) to create the web application user interfacte and [Chakra-UI](https://chakra-ui.com/docs/getting-started) for the frontend of the app.

# Table of Contents

- [What the scraper does?](#what-the-scraper-does)
- [What kind of data was extracted?](#what-kind-of-data-was-extracted)
- [How the application looks like?](#how-the-application-looks-line)
- [Possible future implementations](#possible-future-implementations)

## What the scraper does?

You can see the folder containing the code of the scrapper, made with Pupeteer, [here](https://github.com/JAMorello/belstaff-app/tree/master/src/scraper). There in `scraper.js` you'll find the primary script from were three succesive functions will be called.

The first function comes from `scrape-categories.js`: here the script scrapes from the Belstaff website menu all the links of the posible categories of products that are divided by gender, section and category. A section is a collection of special products (ie. "Collection") or a term that broadly encompases a set of categories (ie. "Outerwear"). A category is a kind of clothing or product (ie. "Suede & Shearling Jackets" ) or the name of a collection (ie. "Autumn Winter 2021"). You can see al the sections and categories [here](https://github.com/JAMorello/belstaff-app/blob/master/src/scraper/data/tree.json).

The second function comes from `scrape-prod-links.js`: here the script access to each link extracted in the previous step and scrapes the url of each product that the section contains.

The third function comes from `scrape-product.js`: here the script iterates through all the scraped links of the product, creates an empty array and populates with the variations of all products, that is, populates it with an array that contains the data of all posible variations (by color or size) of each product present in the Belstaff website.

Finally, the scraper writes a JSON file with all the resulting data extracted. That file will later be used in the React application. You can download and see the json file [here](https://github.com/JAMorello/belstaff-app/blob/master/src/scraper/data/ALLPRODUCTS.json).

## What kind of data was extracted?

For each product, the data of all posible variants (by color and size) are extracted. Meaning, if a product has 3 possible colors and 3 possible sizes, the data of 9 variants are extracted.

The data extracted is the following:

| Attribute       | Data Type  | Description                                                                                                                                                        |
| --------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 'id'            | `string`   | Unique alphanumerical ID representing the variant. Changes with the size and color. May be equal to the SKU.                                                       |
| 'title'         | `string`   | The title or name of the product. Often the headline of the product page.                                                                                          |
| 'subTitle'      | `string`   | The subtitle of the product. May change with the variants.                                                                                                         |
| 'gender'        | `string`   | The gender section in which the product is located                                                                                                                 |
| 'section'       | `string`   | The name of section in which the product is located                                                                                                                |
| 'category'      | `string`   | The name of category in which the product is located (inside a section)                                                                                            |
| 'category_url'  | `string`   | The url of the category. There all the products pertaining could be find                                                                                           |
| 'url'           | `string`   | URL from the variant, it takes you directly to it.                                                                                                                 |
| 'description'   | `string`   | The description of the variant                                                                                                                                     |
| 'images'        | `string[]` | Array with links to the source product images. All of the image links available for the product variant.                                                           |
| 'currency'      | `string`   | The currency used (pounds, dollars, etc.).                                                                                                                         |
| 'sku'           | `string`   | Another alphanumerical identifier for the variant. Many times the site specifies what this identifier is separately from the main id, but may coincide with the ID |
| 'brand'         | `string`   | The brand name or designer of the product.                                                                                                                         |
| 'subBrand'      | `string`   | Represents a different child / sub-brand beneath the family brand                                                                                                  |
| 'size'          | `string`   | The size of the variant. May be numeral (ie. "46") or alphanumerical (ie. "M" or "2XL")                                                                            |
| 'price'         | `string`   | The price that the customer actually has to pay.                                                                                                                   |
| 'availability'  | `boolean`  | `True` if there is stock of that specific variant. `False` if not.                                                                                                 |
| 'itemGroupId'   | `string`   | The ID of the products as a whole (without their variants, but the product group itself).                                                                          |
| 'color'         | `string`   | The color of the variant. The manufacturer’s specified color name. This would be like “Firetruck Red” or “Angel’s pink”.                                           |
| 'breadcrumbs'   | `string[]` | Array from with the website categorical taxonomy path for the item is composed.                                                                                    |
| 'bullets'       | `string[]` | Array containing all bullet points that contain info about a product that is distributed such as an item in a list, to emphasize it.                               |
| 'keyValuePairs' | `Object[]` | Key value pairs made visible to the user on the website. Are always a keyword followed with “:” and it's specific data. For example "Composition: 100% Cotton"..   |

Lastly, you can see an example of a variant:

```
{
      "id": "100030GRNGY44",
      "title": "KELLAND JACKET",
      "subTitle": "Waxed Cotton Granite Grey",
      "gender": "Men",
      "section": "Collections",
      "category": "Icons",
      "category_url": "https://www.belstaff.com/uk/men/icons?lang=en",
      "url": "https://www.belstaff.com/uk/men/icons/kelland-jacket?colour=Granite+Grey&size=44&lang=en",
      "description": "Step things up with the stripped-back Kelland, a durable café racer style with a clean-cut finish. Crafted from 6oz. waxed cotton in smooth Granite Grey, the jacket comes equipped with reinforced shoulders and elbows to protect against wear and tear.",
      "images": [
        "https://cdn.shopify.com/s/files/1/0572/9799/3889/products/KELLAND_JACKET_GRANITE_GREY_71020815C61N015890140_1_2494x3116.jpg?v=1632944835",
        "https://cdn.shopify.com/s/files/1/0572/9799/3889/products/KELLAND_JACKET_GRANITE_GREY_71020815C61N015890140_2_2494x3116.jpg?v=1632944839",
        "https://cdn.shopify.com/s/files/1/0572/9799/3889/products/KELLAND_JACKET_GRANITE_GREY_71020815C61N015890140_3_2494x3116.jpg?v=1632944844",
        "https://cdn.shopify.com/s/files/1/0572/9799/3889/products/KELLAND_JACKET_GRANITE_GREY_71020815C61N015890140_4_2494x3116.jpg?v=1632944848",
        "https://cdn.shopify.com/s/files/1/0572/9799/3889/products/KELLAND_JACKET_GRANITE_GREY_71020815C61N015890140_5_2494x3116.jpg?v=1632944852"
      ],
      "currency": "GBP",
      "sku": "100030GRNGY44",
      "brand": "Belstaff",
      "subBrand": "",
      "size": "44",
      "price": "295.0",
      "availability": true,
      "itemGroupId": "kelland-jacket",
      "color": "Granite Grey",
      "breadcrumbs": ["home", "men", "icons", "kelland jacket"],
      "bullets": [
        "6 oz. cotton, plain-weave fabric, coated with a proprietary blend of micro and technical waxes by the historic British Millerain mill",
        "The wax coating renders the cloth water- and wind-repellent",
        "Cotton-twill lining woven in the signature Belstaff checked pattern",
        "Corduroy linings at the collar, cuffs and hem provide added comfort and resilience at high contact points",
        "Racer-style collar with press-stud closure",
        "Self-fabric reinforced shoulders and elbows provide additional durability on high points of abrasion",
        "Rear kidney guard panel detail",
        "Exposed center front zip with signature roller bar puller",
        "Clean in professional care centre",
        "Sponge clean soiled areas with lukewarm water",
        "Signature antique brass metal hardware engraved with Belstaff England on the round",
        "Signature antique brass logo with belstaff and phoenix on chest\n",
        "Rewax regularly to keep the garment waterproof",
        "Exterior: 100% Cotton"
      ],
      "keyValuePairs": { "Exterior": " 100% Cotton" }
    }
```

## How the application looks like?

The application is fully responsive and has three main sections. The "product selector", the "product item" and the "product modal".

The "product selector" consist in a form control from where the user can select a gender, a section and a category from that section. After hitting the "Show Product" button, a list of "product items" will appear below.

![Selectors](/readme-assets/selectors.jpg)

The "product item" is each row that appear in the list of products that belong to the specific locations the user selected in the form control. Each row contains the name or title of a product, the colors and sizes of all variants (in case those exceed some limit, a `+ X` will appear, wehere "X" is the number of colors of sizes that can't be shown), and the "View" button that will allow the user see the complete information of the variants the product has.

![Items](/readme-assets/items.jpg)

Lastly, the "product modal" contains all the information of the product and its variants. In the header, the title, subtitle, gender, currency and price are displayed. In the middle section, the user has a series of buttons from where to choose the color and size of the variant that wants to see. There, also, is a option dropdown menu from where to select more quickly the desired variant. At the side of all this, an orange button titled "See product" is available: clicking it will open a new tab in the browser and redirect the user to the url of the current variant. En the lower section, the user has at his disposition four tabs: "Details", "Bullets", "Key-Value" and "Images". In those tabs the user can see more information about the selected variant.

![Modal](/readme-assets/modal.jpg)

## Possible future implementations

For the moment, we have in mind only one posible implementations that could further improve the application:

- In the product modal there can be two buttons that, when clicked, changes the information displayed to the previous or next product item present in the list.
