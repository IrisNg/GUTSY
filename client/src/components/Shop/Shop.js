import React from 'react';
import { connect } from 'react-redux';
import { addShopToBasket } from '../../actions';
import history from '../../history';
import './Shop.css';

class Shop extends React.Component {
   renderOwnerButtons = () => {
      const { currentUserId, ownerId, _id } = this.props;
      return currentUserId === ownerId ? (
         <div className="shop__owner-buttons">
            <i className="fas fa-pen" onClick={() => history.push(`/shop/${_id}/edit`)} />
            <i className="fas fa-trash-alt" onClick={() => history.push(`/shop/${_id}/delete`)} />
         </div>
      ) : null;
   };
   onShopClick = () => {
      if (this.props.shop) {
         this.props.addShopToBasket(this.props.shop);
      }
   };
   render() {
      const { productImage, productName, shopName, productPrice } = this.props;
      return (
         <div className="shop" onClick={this.onShopClick}>
            <img src={productImage} className="shop__image" alt={productName} />
            <div className="shop__content">
               <h3 className="shop__product-name">{productName}</h3>
               <h5 className="shop__shop-name">{shopName.length > 30 ? shopName.substring(0, 30).concat('...') : shopName}</h5>
               <h2 className="shop__price">{productPrice ? `$${productPrice}` : ''}</h2>
               {this.renderOwnerButtons()}
            </div>
         </div>
      );
   }
}

Shop.defaultProps = {
   productImage: 'https://i.redd.it/mgith4auaj021.png',
   productName: 'Product Name',
   shopName: 'Shop Name',
   productPrice: '-',
   ownerId: ''
};
export default connect(
   null,
   { addShopToBasket }
)(Shop);
