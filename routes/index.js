const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require('bcrypt');
const objectId = mongoose.Types.ObjectId;
dotenv.config();
const PORT = process.env.PORT;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL).then(() => {
  console.log("Database connected");
});

const productSchema = new mongoose.Schema({
  productName: String,
  description: String,
  price: Number,
});

const productModel = mongoose.model("product", productSchema);

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

const userModel = mongoose.model("user", userSchema);

router.get('/', async function (req, res, next) {
  let user = req.session.user;
  const products = await productModel.find();
  res.render('index', { products, user });
});

router.get('/admin', async function (req, res, next) {
  const products = await productModel.find();
  res.render('adminpage', { title: "Seller Login", products });
});

router.get('/admin/products', async function (req, res, next) {
  const products = await productModel.find();
  res.render('viewproducts', { title: "Products", products });
});

router.get('/admin/add-product', function (req, res) {
  res.render('addproduct', { title: "Add Products" });
});

router.post('/admin/add-product', async function (req, res) {
  const newProduct = new productModel({
    productName: req.body.productName,
    description: req.body.description,
    price: req.body.price,
  });
  const id = new mongoose.Types.ObjectId();
  const idString = id.toHexString();
  const image = req.files.image;
  image.mv(`./public/product-images/${idString}.jpg`);
  await newProduct.save();
  res.redirect('/admin/products'); // Redirect to the products page after saving
});

router.get('/signup', function (req, res) {
  res.render('signup', { title: "Sign Up" });
});

router.post('/signup', async function (req, res) {
  const pw = req.body.password;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(pw, saltRounds);
  const newUser = new userModel({
    email: req.body.email,
    password: hashedPassword
  });
  await newUser.save();
  res.redirect('/'); // Redirect to the home page after signing up
});

router.get('/login', function (req, res) {
  const error = req.session.error;
  req.session.error = null;
  res.render("login", { title: "Login User", error });
});

router.post('/login', async function (req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    req.session.error = 'Invalid username or password';
    return res.redirect('/login');
  }

  const match = await bcrypt.compare(password, user.password);
  if (match) {
    req.session.loggedIn = true;
    req.session.user = user;
    req.session.error = null;
    res.redirect('/');
  } else {
    req.session.error = 'Invalid username or password';
    res.redirect('/login');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

router.get('/cart', (req, res) => {
  res.render("cart", { title: "Your Cart" });
});

const deleteProductById = async (proId) => {
  try {
    const result = await productModel.deleteOne({ _id: new objectId(proId) });
    console.log('Deleted count:', result.deletedCount);
    return result.deletedCount > 0;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

router.get('/delete-product/:id', async (req, res) => {
  const proId = req.params.id;
  console.log(proId);

  try {
    const wasDeleted = await deleteProductById(proId);
    if (wasDeleted) {
      res.redirect('/admin/products')
    } else {
      res.send('Product not found.');
    }
  } catch (error) {
    res.status(500).send('Internal server error.');
  }
});

module.exports = router;
