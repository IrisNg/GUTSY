

var middlewareObj = {};

//Check authentication
middlewareObj.isLoggedIn = function(req, res, next) {
   if (req.isAuthenticated()) {
      return next();
   }
   res.status(401).json('Please login first!');
};

// //Check authorization when updating or deleting post
// middlewareObj.checkPostOwnership = function(req, res, next) {
//    //Check authentication
//    if (req.isAuthenticated()) {
//       //Find author of post
//       Post.findById(req.params.id, function(err, foundPost) {
//          if (err) {
//             res.status(404).json('Post not found');
//          } else {
//             //Check authorization
//             if (foundPost.author.id.equals(req.user._id)) {
//                next();
//             } else {
//                console.log('not authorized!');

//                res.status(401).json('You are not authorized to do that!');
//             }
//          }
//       });
//    } else {
//       res.status(401).json('Please log in before attempting this!');
//    }
// };

module.exports = middlewareObj;
