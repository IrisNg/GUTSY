var mongoose = require('mongoose');

var ShopSchema = new mongoose.Schema({
   shopName: String,
   productPrice: String,
   productName: String,
   productImage: String,
   categoriesName: [String],
   categoriesParam: [String],
   ownerId: String
});

var Shop = mongoose.model('Shop', ShopSchema);

module.exports = Shop;
