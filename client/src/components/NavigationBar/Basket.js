import React from 'react';
import { connect } from 'react-redux';
import BasketItem from './BasketItem';

class Basket extends React.Component {
   renderBasketCounter() {
      const { basket } = this.props;
      if (basket.length === 0) {
         return null;
      }
      return <span className="basket__counter">{basket.length}</span>;
   }
   renderBasketItems() {
      const { basket } = this.props;
      if (basket.length === 0) {
         return <span className="basket__empty-message">No items in here.</span>;
      }
      return basket.map(item => <BasketItem item={item} key={`basket ${item._id}`} />);
   }
   renderCheckoutButton() {
      const { basket } = this.props;
      if (basket.length === 0) {
         return null;
      }
      return <button className="basket__checkout-button">Checkout</button>;
   }
   render() {
      return (
         <>
            <i className="fas fa-shopping-basket">{this.renderBasketCounter()}</i>
            <span>Basket</span>
            <div className="basket__list-container">
               <div className="basket__list">
                  {this.renderBasketItems()}
                  {this.renderCheckoutButton()}
               </div>
            </div>
         </>
      );
   }
}
const mapStateToProps = state => {
   return { basket: state.basket };
};
export default connect(mapStateToProps)(Basket);
