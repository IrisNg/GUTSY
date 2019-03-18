var mongoose = require('mongoose');

var ShopSchema = new mongoose.Schema({
   shopName: String,
   productPrice: String,
   productName: String,
   productImage: String,
   categoriesName: [String],
   categoriesParam: [String],
   mainCategory: String,
   category: String,
   subCategory: String,
   ownerId: String,
   created: {
      type: Date,
      default: Date.now
   }
});

var Shop = mongoose.model('Shop', ShopSchema);

module.exports = Shop;
