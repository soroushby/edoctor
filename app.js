const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");

require("dotenv/config");

const api = process.env.API_URL;

//Middleware
app.use(express.json());
app.use(morgan("tiny"));

const productsSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: String,
  countInStock: { type: Number },
});

const Products = mongoose.model("products", productsSchema);

app.get(`${api}/products`, async (req, res) => {
  const productList = await Products.find();

  if (!productList) {
    res.status(500).json({
      success: false,
    });
  }
  res.send(productList);
});

app.post(`${api}/products`, (req, res) => {
  const product = new Products({
    name: req.body.name,
    image: req.body.image,
    countInstock: req.body.countInstock,
  });

  product
    .save()
    .then((createdProducts) => {
      res.status(201).json(createdProducts);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
});

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "eshop-database",
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
