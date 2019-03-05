import React from 'react';
import { Link } from 'react-router-dom';

const Introduction = () => {
   return (
      <div>
         <h1>If it’s handcrafted, vintage, custom or unique, it’s on Gutsy.</h1>
         <div>
            <div>
               <div>
                  <h3>Crafted for peak coziness</h3>
                  <Link to="/">Shop decor ></Link>
               </div>
               <img />
            </div>
            <div>
               <h3>Plan your spectacular love fest.</h3>
               <Link to="/">Shop weddings ></Link>
            </div>
            <Link to="/">Unique finds that ship for free ></Link>
         </div>
         <ul>
            <li>
               <i className="fas fa-check" />
               <h5>Unique everything</h5>
               <p>
                  We have millions of one-of-a-kind iteams, so you can find whatever you need (or really, really want).
               </p>
            </li>
            <li>
               <i className="fas fa-check" />
               <h5>Independent sellers</h5>
               <p>Buy directly from someone who put their heart and soul into making something special.</p>
            </li>
            <li>
               <i className="fas fa-check" />
               <h5>Secure shopping</h5>
               <p>We use best-in-class technology to protect your transactions.</p>
            </li>
         </ul>
      </div>
   );
};
export default Introduction;
