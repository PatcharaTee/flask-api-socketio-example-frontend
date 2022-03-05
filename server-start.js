const path = require("path");
const express = require("express");
const compression = require("compression");

const app = express();
app.use(compression());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Authorization, X-Requested-With, Content-Type, Accept"
  );
  if (req.headers["x-forwarded-proto"] === "http") {
    console.log(req.get("Host"));
    return res
      .status(301)
      .redirect(["https://", req.get("Host"), req.url].join(""));
  }
  next();
});
app.use(express.static("./dist/socket-demo"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/socket-demo/index.html"));
});

app.listen(process.env.PORT || 8080);

console.log(`Running on port ${process.env.PORT || 8080}`);
