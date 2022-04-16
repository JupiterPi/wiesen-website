import {pages, toc} from "./pages";

const express = require("express");
const app = express();
const port = 63106;

// static files
const _app_folder = "dist/wiesen-website";
app.use(express.static(_app_folder));

// page routes
for (let page of pages) {
    app.get(page.route, function (req, res) {
        res.status(200).sendFile("/index.html", {root: _app_folder});
    });
}

// retrieving pages structure
app.get("/api/pages", function (req, res) {
    res.status(200).send({
        pages: pages,
        toc: toc
    });
});

app.listen(port, () => {
    console.log(`Wiesen Website server listening on port ${port}`);
});