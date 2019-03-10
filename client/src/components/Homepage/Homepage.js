import React from 'react';
import Introduction from './Introduction';
import Popular from './Popular';
import Gift from './Gift';
import CTAbanners from './CTAbanners';
import './Homepage.css';

const Homepage = () => {
   return (
      <div>
         <Introduction />
         {/* <Popular /> */}
         <Gift />
         <CTAbanners />
      </div>
   );
};

export default Homepage;
