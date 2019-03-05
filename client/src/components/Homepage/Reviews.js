import React from 'react';
import Review from './Review';

const renderReviews = () => {
   return (
      <div>
         <Review />
         <Review />
         <Review />
      </div>
   );
};

const Reviews = () => {
   return (
      <div>
         <h3>Recent reviews from happy people</h3>
         {renderReviews()}
      </div>
   );
};

export default Reviews;
