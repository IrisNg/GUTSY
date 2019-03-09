var express = require('express'),
   router = express.Router(),
   Shop = require('../models/Shop');

router.post('/shops', (req, res) => {
   Shop.create(req.body, (err, createdShop) => {
      if (err) {
         res.status(400).json('Could not create shop. Please try again later');
      } else {
         res.json(createdShop);
      }
   });
});
router.get('/shops/:category', (req, res) => {
   Shop.find({ categoriesParam: { $all: [req.params.category] } }, (err, foundShops) => {
      if (err) {
         res.status(400).json('No shops exist in this category');
      } else {
         res.json(foundShops);
      }
   });
});

module.exports = router;
