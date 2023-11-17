const express = require("express")
const fs = require("fs")
const zlib = require("zlib")
const status = require("express-status-monitor")

const app = express();
app.use(status());

fs.createReadStream("./_.txt", "utf-8").pipe(
    zlib.createGzip().pipe(
        fs.createWriteStream("./_.zip")
    )
)

app.listen(3000, ()=> console.log(`Server Running at 3000`));