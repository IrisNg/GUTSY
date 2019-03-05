import React from 'react';

import './NavigationBar.css';

class NavigationBar extends React.Component {
   render() {
      return (
         <div className="navigation-bar">
            <div className="navigation-bar__main-nav">
               <div className="main-nav__primary">
                  <h1 className="main-nav__brand">Gutsy</h1>
                  <div className="main-nav__search">
                     <input type="text" className="main-nav__search-input" placeholder="Search for items or shops" />
                     <button className="main-nav__search-button">Search</button>
                  </div>
               </div>
               <ul className="main-nav__items">
                  <li>Sell on Gutsy</li>
                  <li>Register</li>
                  <li className="main-nav__sign-in">
                     <button>Sign in</button>
                  </li>
                  <li className="main-nav__discover">
                     <i className="fas fa-toolbox" />
                     <span>Discover</span>
                  </li>
                  <li className="main-nav__basket">
                     <i className="fas fa-shopping-basket" />
                     <span>Basket</span>
                  </li>
               </ul>
            </div>
            <ul className="navigation-bar__categories">
               <li>Jewellery & Accessories</li>
               <li>Clothing & Shoes</li>
               <li>Home & Living</li>
               <li>Wedding & Party</li>
               <li>Toys & Entertainment</li>
               <li>Art & Collectibles</li>
               <li>Vintage</li>
            </ul>
         </div>
      );
   }
}
export default NavigationBar;
