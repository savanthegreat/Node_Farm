const fs = require("fs");
const http = require("http");
const url = require("url");

const API_Data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf8");
// console.log(API_Data);
const server = http.createServer((req, res) => {
  const PathName = req.url;
  console.log("We got the request");
  console.log(`URL is ${PathName}`);

  if (PathName == "/TaraBapaNiWebsiteChhe") {
    res.end("<h1>Ha Mara Bapa Ni Website 6.</h1>");
  } else if (PathName == "/Bhaiband" || PathName == "/bhaiband") {
    res.end("<h1>Su K Bhaiband</h1>");
  } else if (PathName == "/") {
    res.end("Kaik to bol L...");
  } else if (PathName == "/API") {
    // console.log("Caame Here");
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Mera-Man": "Kyu Tujhe chahe",
    });
    res.end(API_Data);
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html; charset=utf",
      "Mera-Man": "Kyu Tujhe chahe",
    });
    res.end("GM");
  }
  console.log(
    "======================================================================"
  );
  // res.end("Thanks for visit!");
});

server.listen(3000, "127.0.0.1", () => {
  console.log("We are Waiting!");
  // console.log("here");
});

console.log("Done");
