import {pages, toc} from "./pages";

const express = require("express");
const app = express();
const port = 63106;

export const _data_dir = "data";

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

// retrieving pages
app.get("/api/page/:section/:page", function (req, res) {
    const section = req.params["section"];
    const page = req.params["page"];
    const targetRouteId = section + "/" + page;
    const pageData = pages.find(page => page.routeId === targetRouteId);
    if (pageData === undefined) {
        res.status(404).send();
    } else {
        res.status(200).contentType("text/markdown").sendFile("/" + pageData.routeId + ".md", {root: _data_dir});
    }
});

app.listen(port, () => {
    console.log(`Wiesen Website server listening on port ${port}`);
});