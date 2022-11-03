const express = require("express");
const app = express();

require("dotenv/config");

const api = process.env.API_URL;

app.use(express.json());

app.get(`${api}/doctors`, (req, res) => {
  const doctors = {
    id: 1,
    name: "keyvan",
    image: "some_url",
  };
  res.send(doctors);
});

app.post(`${api}/doctors`, (req, res) => {
  const newDoctor = req.body;
  console.log(newDoctor);
  res.send(newDoctor);
});

app.listen(3000, () => {
  console.log(api);
  console.log("server is running http://localhost:3000");
});
