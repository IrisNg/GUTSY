import React from 'react';
import { Link } from 'react-router-dom';

const CTAbanners = () => {
   return (
      <div>
         <div className="cta-banners__banner banner-1">
            <div className="banner__content">
               <h1 className="banner__header">Start selling on Gutsy</h1>
               <p className="banner__description">Million of shoppers can't wait to see what you have in store.</p>
               <Link to="/shop/create">
                  <span>Open a shop today</span> <i className="fas fa-angle-right" />
               </Link>
            </div>
         </div>
         <div className="cta-banners__banner banner-2">
            <div className="banner__content">
               <h1 className="banner__header">What is Gutsy?</h1>
               <p className="banner__description">We're more than a marketplace.</p>
               <Link to="/">
                  <span>Read all about it </span>
                  <i className="fas fa-angle-right" />
               </Link>
            </div>
         </div>
         <div className="cta-banners__subscription">
            <p className="subscription__description">Get fresh Gutsy trends and unique gift ideas delivered right to your inbox.</p>
            <div className="subscription__field">
               <input type="text" placeholder="Enter your email" className="subscription__input" />
               <button className="subscription__button">Subscribe</button>
            </div>
         </div>
      </div>
   );
};
export default CTAbanners;
