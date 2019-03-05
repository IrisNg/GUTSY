import React from 'react';
import { Link } from 'react-router-dom';

const CTAbanners = () => {
   return (
      <div>
         <div>
            <img src="https://www.etsy.com/assets/dist/images/homepage/vesta/sell_on_etsy_left.20170228151449.png" />
            <h1>Start selling on Etsy</h1>
            <h5>Million of shoppers can't wait to see what you have in store.</h5>
            <Link to="/">Open a shop today ></Link>
            <img src="https://www.etsy.com/assets/dist/images/homepage/vesta/sell_on_etsy_right.20170228151449.png" />
         </div>
         <div>
            <img src="https://www.etsy.com/assets/dist/images/homepage/vesta/about_etsy_wide_left.20170228151449.png" />
            <div>
               <h1>What is Etsy?</h1>
               <h5>We're more than a marketplace.</h5>
               <Link to="/">Read all about it ></Link>
            </div>
            <img src="https://www.etsy.com/assets/dist/images/homepage/vesta/about_etsy_wide_right.20170228151449.png" />
         </div>
         <div>
            <p>Get fresh Etsy trends and unique gift ideas delivered right to your inbox.</p>
            <div>
               <input type="text" placeholder="Enter your email" />
               <button>Subscribe</button>
            </div>
         </div>
      </div>
   );
};
export default CTAbanners;
