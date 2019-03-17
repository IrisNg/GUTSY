import React from 'react';
import { connect } from 'react-redux';
import { fetchShop, deleteShop } from '../../actions';
import Modal from '../Modal/Modal';
class ShopDelete extends React.Component {
   componentDidMount() {
      this.props.fetchShop(this.props.match.params.id);
   }
   onAccept = () => {
      const { id } = this.props.match.params;
      this.props.deleteShop(id);
   };
   render() {
      if (!this.props.shop) {
         return <div />;
      }
      const { shopName } = this.props.shop;
      return (
         <div>
            <Modal onAccept={this.onAccept} item={`shop '${shopName}'`} />
         </div>
      );
   }
}
const mapStateToProps = (state, ownProps) => {
   const shop = state.shops.find(shop => shop._id === ownProps.match.params.id);
   return { shop };
};
export default connect(
   mapStateToProps,
   { fetchShop, deleteShop }
)(ShopDelete);
