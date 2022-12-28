const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
app.use(cors())
app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }))
app.use(bodyParser.json())
const fileupload = require("express-fileupload");
app.use(fileupload({ useTempFiles: true }));

//import routes
const routes=require('./routes/routes')

app.use("/",routes)

module.exports=app