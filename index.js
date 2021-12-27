// Core Modules
const fs = require("fs");
const http = require("http");
const url = require("url");

// Top Level Code
const ReplaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);

  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }
  return output;
};

const API_Data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf8");
const API_Data_Object = JSON.parse(API_Data);
const OverviewPage = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf8"
);
const ProductPage = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf8"
);
const CardTempelate = fs.readFileSync(
  `${__dirname}/templates/card.html`,
  "utf8"
);

const CardsHtml = API_Data_Object.map((el) =>
  ReplaceTemplate(CardTempelate, el)
).join("");

const OverviewOutputPage = OverviewPage.replace(/{%PRODUCT_CARDS%}/, CardsHtml);

// Server
const server = http.createServer((req, res) => {
  const IdinUrl = url.parse(req.url, true).query["id"];
  const PathName = url.parse(req.url, true).pathname;
  console.log("We got the request");
  console.log(`URL is ${PathName}`);
  // Overview Page
  if (PathName == "/Overview" || PathName == "/overview" || PathName == "/") {
    res.end(OverviewOutputPage);
    res.writeHead(201, {
      "Content-Type": "text/html; charset=utf",
    });
  }

  // Product Page
  else if (PathName == "/Product" || PathName == "/product") {
    console.log(API_Data_Object[IdinUrl]);
    const ProductData = API_Data_Object[IdinUrl];
    const output = ReplaceTemplate(ProductPage, ProductData);
    res.end(output);
    res.writeHead(201, {
      "Content-Type": "text/html; charset=utf",
    });
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html; charset=utf",
    });
    res.end("We are Not able to find any page as per your Request.");
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("We are Waiting!");
});
