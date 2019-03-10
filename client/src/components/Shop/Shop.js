import React from 'react';
const renderEdit = (currentUserId, ownerId) => {
   return currentUserId === ownerId ? (
      <div className="shop__edit">
         <i className="fas fa-pen" />
      </div>
   ) : null;
};
const Shop = ({ shop: { shopName, productPrice, productName, productImage, ownerId }, currentUserId }) => {
   return (
      <div className="shop">
         <img src={productImage} className="shop__image" />
         <h3 className="shop__product-name">{productName}</h3>
         <h5 className="shop__shop-name">{shopName}</h5>
         <h2 className="shop__price">${productPrice}</h2>
         {renderEdit(currentUserId, ownerId)}
      </div>
   );
};

export default Shop;
