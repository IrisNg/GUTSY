//-- SETUP : REQUIRING DEPENDENCIES
var express = require('express'),
   app = express(),
   bodyParser = require('body-parser'),
   mongoose = require('mongoose'),
   port = process.env.PORT || 5000,
   uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/gutsy_app';

//-- SETUP : REQUIRING ROUTES

//-- SETUP : REQUIRING MODELS
const path = require('path');
const shopRoutes = require('./routes/shop');

//-- SETUP : APP CONFIG
mongoose.connect(uri, { useNewUrlParser: true });
//NOTE: Required for axios to post form from React
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//-- ROUTES
app.use(shopRoutes);
// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
   // Set static folder
   app.use(express.static('client/build'));

   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
   });
}
//-- PORT CONFIG
app.listen(port, function() {
   console.log('Server started on port ' + port);
});
