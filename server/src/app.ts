const express = require("express");
const app = express();
const port = 63106;

const _app_folder = "dist/wiesen-website";
app.use(express.static(_app_folder));

app.listen(port, () => {
    console.log(`Wiesen Website server listening on port ${port}`);
});