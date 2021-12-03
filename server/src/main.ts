require("dotenv/config");

const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const app = express();
const TokenController = require("./controller/TokenController.ts");
const UserController = require("./controller/UserController.ts");
const SelectiveController = require("./controller/SelectiveController.ts");
var bodyParser = require("body-parser");
var formidable = require("express-formidable");
app.use(formidable());
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => res.send("Backend started"));

app.post("/api/v1/user/register", UserController.register);
app.get("/api/v1/user/detail/:id", UserController.detail);

app.get("/api/v1/selective/detail/:id", SelectiveController.detail);
app.get("/api/v1/selective/list/", SelectiveController.list);
app.put("/api/v1/selective/edit/:id", SelectiveController.update);

app.listen(3333, () => console.log("running..."));
