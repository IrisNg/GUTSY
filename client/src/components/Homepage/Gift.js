import React from 'react';
import history from '../../history';

const Gift = () => {
   return (
      <div className="gift">
         <div className="gift__title">
            <h2 className="gift__header">Shop for gifts</h2>
            <div className="gift__link">See more</div>
         </div>
         <ul className="gift__list" onClick={() => history.push('/category/wedding-and-party')}>
            <li>
               <img src="https://i.etsystatic.com/15599295/d/il/5b5e83/1821870697/il_340x270.1821870697_d4du.jpg?version=0" alt="anniversary glass" />
               <p>Anniversary gifts</p>
            </li>
            <li>
               <img src="https://i.etsystatic.com/18624262/d/il/a4a1be/1788617134/il_340x270.1788617134_aqcc.jpg?version=0" alt="cuff links" />
               <p>Gifts for him</p>
            </li>
            <li>
               <img src="https://i.etsystatic.com/18989446/d/il/44b9a5/1797818792/il_340x270.1797818792_2044.jpg?version=0" alt="hair bands" />
               <p>Gifts for her</p>
            </li>
            <li>
               <img
                  src="https://i.etsystatic.com/10721981/d/il/18550c/1839774131/il_340x270.1839774131_9h73.jpg?version=0"
                  alt="cup with inscription"
               />
               <p>Personalised gift ideas</p>
            </li>
            <li>
               <img src="https://i.etsystatic.com/5860328/d/il/7249c6/1844712351/il_340x270.1844712351_1s3v.jpg?version=0" alt="couple t shirt" />
               <p>Wedding gifts</p>
            </li>
            <li>
               <img src="https://i.etsystatic.com/19337399/d/il/395bf1/1842005237/il_340x270.1842005237_9uv6.jpg?version=0" alt="hand made canvas" />
               <p>Housewarming gifts</p>
            </li>
         </ul>
      </div>
   );
};
export default Gift;
