const path = require("path");
const express = require("express");
const mustacheExpress = require("mustache-express");
const { bindRoutes } = require("./routes/index.js");

const app = express();

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", path.join(__dirname, "views"));

app.use(function (req, res, next) {
    res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.set("Pragma", "no-cache");
    res.set("Expires", "0");
    next();
});

app.use(express.static(path.join(__dirname, "public"), {
    setHeaders: function (res) {
        res.set("Cache-Control", "no-store, no-cache, must-revalidate");
    }
}));
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
    const time = new Date().toISOString();
    console.log(`[${time}] ${req.method} ${req.url}`);
    next();
});

bindRoutes(app);

module.exports = app;
