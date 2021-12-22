const fs = require("fs");
const http = require("http");
const url = require("url");

const API_Data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf8");
// console.log(API_Data);
const server = http.createServer((req, res) => {
  const PathName = req.url;
  console.log("We got the request");
  console.log(`URL is ${PathName}`);

  if (PathName == "/Overview" || PathName == "/overview" || PathName == "/") {
    res.end("<h1>Welcome To Overview page</h1>");
  } else if (PathName == "/Product" || PathName == "/product") {
    res.end("<h1>Welcome To Product page</h1>");
  } else if (PathName == "/API") {
    // console.log("Caame Here");
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Mera-Man": "Kyu Tujhe chahe",
    });
    res.end("<h1>You Got all Data Below</h1>" + API_Data);
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html; charset=utf",
      "Mera-Man": "Kyu Tujhe chahe",
    });
    res.end("GM");
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("We are Waiting!");
});
