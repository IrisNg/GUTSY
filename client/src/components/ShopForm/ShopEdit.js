import React from 'react';
import { connect } from 'react-redux';
import { updateShop, fetchShop } from '../../actions';
import ShopForm from './ShopForm';

class ShopEdit extends React.Component {
   componentDidMount() {
      this.props.fetchShop(this.props.match.params.id);
   }
   onSubmit = formValues => {
      const { id } = this.props.match.params;
      this.props.updateShop(id, formValues);
   };

   render() {
      const { formValues, isSignedIn, initialValues } = this.props;
      return (
         <div className="shop-create">
            <ShopForm
               initialValues={initialValues}
               formValues={formValues}
               isSignedIn={isSignedIn}
               onSubmit={this.onSubmit}
               header="Edit Shop"
               description="Changed your mind? Let us know what you want to change."
            />
         </div>
      );
   }
}

const mapStateToProps = (state, ownProps) => {
   const shop = state.shops.find(shop => shop._id === ownProps.match.params.id);
   const reduxProps = { isSignedIn: state.auth.isSignedIn, initialValues: shop, formValues: null };
   if (state.form.shopForm && state.form.shopForm.values) {
      reduxProps.formValues = state.form.shopForm.values;
   }
   return { ...reduxProps };
};
export default connect(
   mapStateToProps,
   { updateShop, fetchShop }
)(ShopEdit);
