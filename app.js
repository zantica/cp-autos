const express = require("express");
// const Sequelize = require("sequelize");
const app = express();
const productsModel = require("./models").products;
const categoriesModel = require("./models").categories;
const userModel = require("./models").user;

// para usar variables .env
require("dotenv").config();

// para usar req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send("You're on the app");
});

app.get("/products", async (req, res) => {
  const products = await productsModel.findAll();
  res.status(200).send(products);
});

app.post("/products", async (req, res) => {
  console.log(req.body);
  const productCreated = await productsModel.create(req.body);
  res.send(productCreated);
});

app.get("/categories", async (req, res) => {
  const categories = await categoriesModel.findAll();
  res.status(200).send(categories);
});

app.post("/categories", async (req, res) => {
  console.log(req.body);
  const categoryCreated = await categoriesModel.create(req.body);
  res.send(categoryCreated);
});

app.get("/user", async (req, res) => {
  const categories = await userModel.findAll();
  res.status(200).send(categories);
});

app.post("/user", async (req, res) => {
  try {
    const { first_name, last_name, email, username, password } = req.body;
    const findUser = await userModel.findAll({
      where: { email: email },
    });
    if (findUser) {
      res.status(401).send("User already exists");
      throw new Error();
    }
    const userCreated = await userModel.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      username: username,
      password: password,
    });
    res.status(200).send(userCreated);
  } catch (err) {
    console.log(err);
  }
});

app.delete("/user/:id", async (req, res) => {
  const { id } = req.params;

  console.log(id);
  await userModel.destroy({
    where: {
      id: parseInt(id),
    },
  });
  res.sendStatus(200);
});

app.listen(process.env.BACK_PORT, () => {
  console.log("server running on port 3100");
});
