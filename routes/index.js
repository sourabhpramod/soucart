var express = require('express');
var router = express.Router();

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

module.exports = router;
