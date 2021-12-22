// Core Modules
const fs = require("fs");
const http = require("http");
const url = require("url");

// Top Level Code
const API_Data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf8");
const OverviewPage = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf8"
);
const ProductPage = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf8"
);

// Server
const server = http.createServer((req, res) => {
  const PathName = req.url;
  console.log("We got the request");
  console.log(`URL is ${PathName}`);

  if (PathName == "/Overview" || PathName == "/overview" || PathName == "/") {
    res.end(OverviewPage);
    res.writeHead(201, {
      "Content-Type": "text/html; charset=utf",
    });
  } else if (PathName == "/Product" || PathName == "/product") {
    res.end(ProductPage);
    res.writeHead(201, {
      "Content-Type": "text/html; charset=utf",
    });
  } else if (PathName == "/API" || PathName == "/api") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end("<h1>You Got all Data Below</h1>" + API_Data);
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html; charset=utf",
    });
    res.end("GM");
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("We are Waiting!");
});
