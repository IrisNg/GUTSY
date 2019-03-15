import React from 'react';
import { connect } from 'react-redux';
import { createShop } from '../../actions';
import ShopForm from './ShopForm';

class ShopCreate extends React.Component {
   onSubmit = formValues => {
      this.props.createShop(formValues);
   };

   render() {
      const { formValues, isSignedIn } = this.props;
      return (
         <div className="shop-create">
            <ShopForm
               formValues={formValues}
               isSignedIn={isSignedIn}
               onSubmit={this.onSubmit}
               header="Create Shop"
               description="Let's get started! Tell us about you and your shop."
            />
         </div>
      );
   }
}

const mapStateToProps = state => {
   if (!state.form.shopForm || !state.form.shopForm.values) {
      return { formValues: null, isSignedIn: state.auth.isSignedIn };
   }
   return { formValues: state.form.shopForm.values, isSignedIn: state.auth.isSignedIn };
};
export default connect(
   mapStateToProps,
   { createShop }
)(ShopCreate);
