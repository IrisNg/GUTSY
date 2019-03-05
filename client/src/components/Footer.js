import React from 'react';
import './Footer.css';

const Footer = () => {
   return (
      <div>
         <div className="footer__site-map">
            <ul>
               <h6 className="site-map__header">Shop</h6>
               <li>Gift cards</li>
               <li>Gutsy blog</li>
            </ul>
            <ul>
               <h6 className="site-map__header">Sell</h6>
               <li>Sell on Gutsy</li>
               <li>Teams</li>
               <li>Forums</li>
            </ul>
            <ul>
               <h6 className="site-map__header">About</h6>
               <li>Gutsy, Inc.</li>
               <li>Policies</li>
               <li>Investors</li>
               <li>Careers</li>
               <li>Press</li>
               <li>Legal imprint</li>
            </ul>
            <ul>
               <h6 className="site-map__header">Follow Gutsy</h6>
               <li>
                  <i className="fab fa-facebook" />
                  <span>Facebook</span>
               </li>
               <li>
                  <i className="fab fa-instagram" />
                  <span>Instagram</span>
               </li>
               <li>
                  <i className="fab fa-pinterest" />
                  <span>Pinterest</span>
               </li>
               <li>
                  <i className="fab fa-twitter" />
                  <span>Twitter</span>
               </li>
            </ul>
         </div>
         <div className="footer__company-details">
            <div>
               <h3 className="company-details__brand">Gutsy</h3>
               <span className="company-details__slogan">We make it easy to find your thing.</span>
            </div>
            <ul className="company-details__links">
               <li>© 2019 Gutsy, Inc.</li>
               <li>Terms of Use</li>
               <li>Privacy</li>
               <li>Interest-based ads</li>
            </ul>
         </div>
      </div>
   );
};
export default Footer;
