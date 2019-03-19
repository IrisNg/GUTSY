import React from 'react';
import { connect } from 'react-redux';
import BasketItem from './BasketItem';

export class Basket extends React.Component {
   renderBasketCounter(basketItems) {
      if (basketItems.length === 0) {
         return null;
      }
      return <span className="basket__counter">{basketItems.length}</span>;
   }
   renderBasketItems(basketItems) {
      if (basketItems.length === 0) {
         return <span className="basket__empty-message">No items in here.</span>;
      }
      return basketItems.map(item => <BasketItem item={item} key={`basket ${item._id}`} />);
   }
   renderBasketTotal(basketItems) {
      if (basketItems.length === 0) {
         return null;
      }
      const basketTotal = basketItems.reduce((acc, cur) => acc + parseInt(cur.productPrice, 10), 0);
      return (
         <div className="basket__total">
            <h5 className="basket__total-header">Total</h5>
            <h6 className="basket__total-value">${basketTotal.toFixed(2)}</h6>
         </div>
      );
   }
   renderCheckoutButton(basketItems) {
      if (basketItems.length === 0) {
         return null;
      }
      return <button className="basket__checkout-button">Checkout</button>;
   }
   render() {
      const { basketItems } = this.props;
      return (
         <>
            <i className="fas fa-shopping-basket">{this.renderBasketCounter(basketItems)}</i>
            <span>Basket</span>
            <div className="basket__list-container">
               <div className="basket__list">
                  {this.renderBasketItems(basketItems)}
                  {this.renderBasketTotal(basketItems)}
                  {this.renderCheckoutButton(basketItems)}
               </div>
            </div>
         </>
      );
   }
}
const mapStateToProps = state => {
   return { basketItems: state.basket };
};
export default connect(mapStateToProps)(Basket);
