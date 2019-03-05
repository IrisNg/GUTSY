import React from 'react';
import { Link } from 'react-router-dom';

const Gift = () => {
   return (
      <div>
         <div>
            <h3>Shop for gifts</h3>
            <Link to="/" />
         </div>
         <ul>
            <li>
               <img src="https://i.etsystatic.com/15599295/d/il/5b5e83/1821870697/il_340x270.1821870697_d4du.jpg?version=0" />
               <h6>Anniversary gifts</h6>
            </li>
            <li>
               <img src="https://i.etsystatic.com/18624262/d/il/a4a1be/1788617134/il_340x270.1788617134_aqcc.jpg?version=0" />
               <h6>Gifts for him</h6>
            </li>
            <li>
               <img src="https://i.etsystatic.com/18989446/d/il/44b9a5/1797818792/il_340x270.1797818792_2044.jpg?version=0" />
               <h6>Gifts for her</h6>
            </li>
            <li>
               <img src="https://i.etsystatic.com/10721981/d/il/18550c/1839774131/il_340x270.1839774131_9h73.jpg?version=0" />
               <h6>Personalised gift ideas</h6>
            </li>
            <li>
               <img src="https://i.etsystatic.com/5860328/d/il/7249c6/1844712351/il_340x270.1844712351_1s3v.jpg?version=0" />
               <h6>Wedding gifts</h6>
            </li>
            <li>
               <img src="https://i.etsystatic.com/19337399/d/il/395bf1/1842005237/il_340x270.1842005237_9uv6.jpg?version=0" />
               <h6>Housewarming gifts</h6>
            </li>
         </ul>
      </div>
   );
};
export default Gift;
