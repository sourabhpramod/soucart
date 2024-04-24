var express = require('express');
var router = express.Router();
const mongoose = require("mongoose")
const dotenv = require("dotenv");



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


/* GET home page. */
router.get('/', function (req, res, next) {
  let products = [
    {
      name: "Iphone 11",
      category: "Mobile",
      description: "Nice phone",
      image: "https://www.smartcellular.in/media/catalog/product/cache/cfaa1692031f009488d1cfea5ce7e1ee/r/_/r_1_1.jpg"

    },
    {
      name: "OnePlus 7T",
      category: "Mobile",
      description: "Nice phone",
      image: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1708679170/Croma%20Assets/Communication/Mobiles/Images/250994_0_wvqdxi.png?tr=w-600"

    },
    {
      name: "Redmi Note 10S",
      category: "Mobile",
      description: "Nice phone",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDQVUgUtdfLktljb-cAxZ6loAMiQ1UJrU_xZdzH9LmQg&s"

    },
    {
      name: "Vivo Y20",
      category: "Mobile",
      description: "Nice phone",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0GjGRrJMcF0wCYJvEGKMMiNeT7k5wRzg0kpL0cCV-ag&s"

    },


  ]
  res.render('index', { products });
});

router.get('/admin', function (req, res, next) {
  let products = [
    {
      name: "Iphone 11",
      category: "Mobile",
      description: "Nice phone",
      image: "https://www.smartcellular.in/media/catalog/product/cache/cfaa1692031f009488d1cfea5ce7e1ee/r/_/r_1_1.jpg"

    },
    {
      name: "OnePlus 7T",
      category: "Mobile",
      description: "Nice phone",
      image: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1708679170/Croma%20Assets/Communication/Mobiles/Images/250994_0_wvqdxi.png?tr=w-600"

    },
    {
      name: "Redmi Note 10S",
      category: "Mobile",
      description: "Nice phone",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDQVUgUtdfLktljb-cAxZ6loAMiQ1UJrU_xZdzH9LmQg&s"

    },
    {
      name: "Vivo Y20",
      category: "Mobile",
      description: "Nice phone",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0GjGRrJMcF0wCYJvEGKMMiNeT7k5wRzg0kpL0cCV-ag&s"

    },


  ]
  res.render('adminpage', { title: "Seller Login", products })
})

router.get('/admin/products', function (req, res, next) {
  let products = [
    {
      name: "Iphone 11",
      category: "Mobile",
      description: "Rs. 1,20,000",
      image: "https://www.smartcellular.in/media/catalog/product/cache/cfaa1692031f009488d1cfea5ce7e1ee/r/_/r_1_1.jpg"

    },
    {
      name: "OnePlus 7T",
      category: "Mobile",
      description: "Rs. 63,940",
      image: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1708679170/Croma%20Assets/Communication/Mobiles/Images/250994_0_wvqdxi.png?tr=w-600"

    },
    {
      name: "Redmi Note 10S",
      category: "Mobile",
      description: "Rs. 14,900",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDQVUgUtdfLktljb-cAxZ6loAMiQ1UJrU_xZdzH9LmQg&s"

    },
    {
      name: "Vivo Y20",
      category: "Mobile",
      description: "Rs. 23,000",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0GjGRrJMcF0wCYJvEGKMMiNeT7k5wRzg0kpL0cCV-ag&s"

    },


  ]



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
  const image = req.files.image;
  image.mv('./public/product-images/' + id + '.jpg')
  res.render('/admin/add-product', { title: "Add Products" })
  return newProduct.save();


})

module.exports = router;
