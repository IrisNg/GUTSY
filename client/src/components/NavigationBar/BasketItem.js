import React from 'react';

const BasketItem = ({ item }) => {
   return (
      <div className="basket-item">
         <img src={item.productImage} alt={`basket item ${item.productName}`} className="basket-item__image" />
         <div className="basket-item__product-details">
            <h5 className="basket-item__name">{item.productName}</h5>
            <h3 className="basket-item__price">$ {item.productPrice}</h3>
         </div>
      </div>
   );
};

export default BasketItem;
