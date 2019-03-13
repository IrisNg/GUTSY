import React from 'react';
import history from '../../history';

const Introduction = () => {
   return (
      <div className="introduction">
         <h1 className="introduction__header">
            If it’s handcrafted, vintage, custom or unique, <br />
            it’s on Gutsy.
         </h1>
         <div className="introduction__catalog">
            <div className="catalog__decor" onClick={() => history.push('/category/home-and-living')}>
               <div className="decor__content">
                  <h3 className="decor__header">Crafted for peak coziness</h3>
                  <div className="decor__link">
                     Shop decor
                     <i className="fas fa-angle-right" />
                  </div>
               </div>
               <img
                  src="https://i.etsystatic.com/ij/1b08a3/1721469044/ij_halfxhalf.1721469044_kjdjh5u1.jpg?version=0"
                  alt="stack of comfortable looking sweaters"
               />
            </div>
            <div className="catalog__sub">
               <div className="catalog__sub-wedding" onClick={() => history.push('/category/wedding-and-party')}>
                  <img src="https://i.etsystatic.com/ij/6f26c4/1768928451/ij_halfxhalf.1768928451_1gqi1iiu.jpg?version=0" alt="wedding cake" />
                  <div className="wedding__content">
                     <h3 className="wedding__header">Plan your spectacular love fest.</h3>
                     <div className="wedding__link">
                        Shop weddings
                        <i className="fas fa-angle-right" />
                     </div>
                  </div>
               </div>
               <div className="catalog__sub-unique" onClick={() => history.push('/category/craft-supplies-and-tools')}>
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
export default Introduction;
