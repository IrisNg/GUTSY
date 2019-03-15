var express = require('express'),
   router = express.Router(),
   Shop = require('../models/Shop');

router.post('/shops/searches', (req, res) => {
   //Use regular expression to search for productName or shopName containing the search term
   var regExp = new RegExp(req.body.searchTerm, 'i');
   Shop.find({ $or: [{ productName: { $regex: regExp } }, { shopName: { $regex: regExp } }] }, (err, foundShops) => {
      if (err) {
         res.status(400).json('No search result');
      } else {
         res.json(foundShops);
      }
   });
});
router.post('/shops', (req, res) => {
   Shop.create(req.body, (err, createdShop) => {
      if (err) {
         console.log(err);
         res.status(400).json('Could not create shop. Please try again later');
      } else {
         res.json(createdShop);
      }
   });
});
router.get('/categories/:category', (req, res) => {
   Shop.find({ categoriesParam: { $all: [req.params.category] } }, (err, foundShops) => {
      if (err) {
         res.status(400).json('No shops exist in this category');
      } else {
         res.json(foundShops);
      }
   });
});
router.get('/shops/:id', (req, res) => {
   Shop.findById(req.params.id, (err, foundShop) => {
      if (err) {
         res.status(400).json('Could not find the shop you were looking for');
      } else {
         res.json(foundShop);
      }
   });
});
router.put('/shops/:id', (req, res) => {
   Shop.findByIdAndUpdate(req.params.id, req.body, (err, updatedShop) => {
      if (err) {
         console.log(err);
         res.status(400).json('Something went wrong while updating the shop');
      } else {
         res.json(updatedShop);
      }
   });
});

module.exports = router;
