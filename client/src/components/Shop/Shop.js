import React from 'react';
import history from '../../history';
import './Shop.css';

const renderEdit = (currentUserId, ownerId, _id) => {
   return currentUserId === ownerId ? (
      <div className="shop__edit" onClick={() => history.push(`/shop/${_id}/edit`)}>
         <i className="fas fa-pen" />
      </div>
   ) : null;
};
const Shop = ({ productImage, productName, shopName, productPrice, ownerId, currentUserId, _id }) => {
   return (
      <div className="shop">
         <img src={productImage} className="shop__image" alt={productName} />
         <div className="shop__content">
            <h3 className="shop__product-name">{productName}</h3>
            <h5 className="shop__shop-name">{shopName}</h5>
            <h2 className="shop__price">{productPrice ? `$${productPrice}` : ''}</h2>
            {renderEdit(currentUserId, ownerId, _id)}
         </div>
      </div>
   );
};

Shop.defaultProps = {
   productImage: 'https://i.redd.it/mgith4auaj021.png',
   productName: 'Product Name',
   shopName: 'Shop Name',
   productPrice: '-',
   ownerId: ''
};
export default Shop;
