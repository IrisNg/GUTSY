import React from 'react';
import { connect } from 'react-redux';
import history from '../../history';
import { selectCategory } from '../../actions';

const onCategoryClick = (name, param, selectCategory) => {
   selectCategory(name, param);
   history.push(`/category/${param}`);
};
const Introduction = ({ selectCategory }) => {
   return (
      <div className="introduction">
         <h1 className="introduction__header">
            If it’s handcrafted, vintage, custom or unique, <br />
            it’s on Gutsy.
         </h1>
         <div className="introduction__catalog">
            <div className="catalog__decor" onClick={() => onCategoryClick('Home & Living', 'home-and-living', selectCategory)}>
               <div className="decor__content">
                  <h3 className="decor__header">Crafted for peak coziness</h3>
                  <div className="decor__link">
                     Shop decor
                     <i className="fas fa-angle-right" />
                  </div>
               </div>
               <img src="https://i.etsystatic.com/ij/1b08a3/1721469044/ij_halfxhalf.1721469044_kjdjh5u1.jpg?version=0" />
            </div>
            <div className="catalog__sub">
               <div className="catalog__sub-wedding" onClick={() => onCategoryClick('Wedding & Party', 'wedding-and-party', selectCategory)}>
                  <img src="https://i.etsystatic.com/ij/6f26c4/1768928451/ij_halfxhalf.1768928451_1gqi1iiu.jpg?version=0" />
                  <div className="wedding__content">
                     <h3 className="wedding__header">Plan your spectacular love fest.</h3>
                     <div className="wedding__link">
                        Shop weddings
                        <i className="fas fa-angle-right" />
                     </div>
                  </div>
               </div>
               <div
                  className="catalog__sub-unique"
                  onClick={() => onCategoryClick('Craft Supplies & Tools', 'craft-supplies-and-tools', selectCategory)}
               >
                  Unique finds that ship for free <i className="fas fa-angle-right" />
               </div>
            </div>
         </div>
         <ul className="introduction__list">
            <li>
               <div>
                  <i className="fas fa-check" />
                  <h5 className="introduction__list-header">Unique everything</h5>
               </div>
               <p>We have millions of one-of-a-kind iteams, so you can find whatever you need (or really, really want).</p>
            </li>
            <li>
               <div>
                  <i className="fas fa-check" />
                  <h5 className="introduction__list-header">Independent sellers</h5>
               </div>
               <p>Buy directly from someone who put their heart and soul into making something special.</p>
            </li>
            <li>
               <div>
                  <i className="fas fa-check" />
                  <h5 className="introduction__list-header">Secure shopping</h5>
               </div>
               <p>We use best-in-class technology to protect your transactions.</p>
            </li>
         </ul>
      </div>
   );
};
export default connect(
   null,
   { selectCategory }
)(Introduction);
