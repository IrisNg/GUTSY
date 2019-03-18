import React from 'react';
import Introduction from './Introduction';
import Latest from './Latest';
import Gift from './Gift';
import CTAbanners from './CTAbanners';
import './Homepage.css';

const Homepage = () => {
   return (
      <div>
         <Introduction />
         <Latest />
         <Gift />
         <CTAbanners />
      </div>
   );
};

export default Homepage;
