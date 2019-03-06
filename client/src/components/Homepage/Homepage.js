import React from 'react';
import Introduction from './Introduction';
import Popular from './Popular';
import Gift from './Gift';
import Reviews from './Reviews';
import CTAbanners from './CTAbanners';
import './Homepage.css';

const Homepage = () => {
   return (
      <div>
         <Introduction />
         {/* <Popular /> */}
         <Gift />
         {/* <Reviews /> */}
         <CTAbanners />
      </div>
   );
};

export default Homepage;
