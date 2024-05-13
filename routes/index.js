var express = require('express');
var router = express.Router();
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const bcrypt = require('bcrypt');


dotenv.config();
const PORT = process.env.PORT;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL).then(() => {
  console.log("Database connected");
})

const productSchema = new mongoose.Schema({
  productName: String,
  description: String,
  price: Number,


})
const productModel = mongoose.model("product", productSchema)

const userSchema = new mongoose.Schema({
  email: String,
  password: String

})
const userModel = mongoose.model("user", userSchema)



/* GET home page. */
router.get('/', async function (req, res, next) {

  const products = await productModel.find()
  res.render('index', { products });
});

router.get('/admin', async function (req, res, next) {
  const products = await productModel.find()
  res.render('adminpage', { title: "Seller Login", products })
})

router.get('/admin/products', async function (req, res, next) {
  const products = await productModel.find()
  res.render('viewproducts', { title: "Products", products })
})
router.get('/admin/add-product', function (req, res) {
  res.render('addproduct', { title: "Add Products" })

})

router.post('/admin/add-product', async function (req, res) {

  console.log(req.body)


  const newProduct = new productModel({
    productName: req.body.productName,
    description: req.body.description,
    price: req.body.price,

  })
  const id = new mongoose.Types.ObjectId();
  console.log(id)
  const idString = id.toHexString();
  const image = req.files.image;
  image.mv(`./public/product-images/${idString}.jpg`)
  res.render('/admin/add-product', { title: "Add Products" })
  return newProduct.save();


})
router.get('/signup', function (req, res) {
  res.render('signup', { title: "Sign Up" })

})

router.post('/signup', async function (req, res) {
  console.log(req.body)
  const pw = req.body.password;
  const saltRounds = 10; // Recommended number of rounds
  bcrypt.genSalt(saltRounds, function (err, salt) {
    // Hash the password using the generated salt
    bcrypt.hash(pw, salt, function (err, hashedPassword) {
      if (err) {
        console.error('Error while hashing password:', err);
      } else {
        const newUser = new userModel({
          email: req.body.email,
          password: hashedPassword
        })
        return newUser.save();
        console.log('Hashed password:', hashedPassword);
      }
    });
  });

  res.render('index', { title: "Home" })


})

router.get('/login', function (req, res) {
  res.render("login", { title: "Login User" })


})

router.post('/login', async function (req, res) {
  console.log(req.body);
  email = req.body.email;
  const user = await userModel.findOne({ email });
  if (!user) {
    res.status(404).send('User not found');
  }
  password = req.body.password;
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    // Passwords match, login successful
    return res.status(200).send('Login successful');
  } else {
    // Passwords don't match
    return res.status(401).send('Invalid email or password');
  }



})

module.exports = router;
