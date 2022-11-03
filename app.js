const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");

require("dotenv/config");

const api = process.env.API_URL;

//Middleware
app.use(express.json());
app.use(morgan("tiny"));

app.get(`${api}/products`, (req, res) => {
  const products = {
    id: 1,
    name: "keyvan",
    image: "some_url",
  };
  res.send(products);
});

app.post(`${api}/products`, (req, res) => {
  const newProducts = req.body;
  console.log(newProducts);
  res.send(newProducts);
});

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "edoctor-database",
  })
  .then(() => {
    console.log("database connection is ready");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log(api);
  console.log("server is running http://localhost:3000");
});
