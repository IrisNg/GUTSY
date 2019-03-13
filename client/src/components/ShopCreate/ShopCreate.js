import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import productCategories from '../../productCategories';
import { createShop, seedShops } from '../../actions';

import './ShopCreate.css';

class ShopCreate extends React.Component {
   state = {
      askSignIn: false
   };
   componentDidUpdate() {
      if (this.state.askSignIn && this.props.isSignedIn) {
         this.setState({ askSignIn: false });
      }
   }
   //Render any submit validation error
   renderError({ touched, error }) {
      if (touched && error) {
         return <div className="shop-create__error">* {error}</div>;
      }
   }
   //Render text input wired to redux-form
   renderInput = ({ input, label, meta, placeholder }) => {
      return (
         <div className="shop-create__field">
            <label className="shop-create__label">{label}</label>
            <input {...input} placeholder={placeholder} className="shop-create__input" />
            {this.renderError(meta)}
         </div>
      );
   };
   //Render drop down wired to redux-form
   renderDropDown = ({ input, meta, renderFunction, formValues, key }) => {
      return (
         <div key={key} className="shop-create__drop-down">
            <select {...input}>{renderFunction(formValues)}</select>
            {this.renderError(meta)}
         </div>
      );
   };
   //Map category options based on the Array passed in
   mapOptions(categoriesArr) {
      if (categoriesArr.length === 0) {
         return null;
      }
      return [
         <option value="" disabled key="none">
            Select a Category
         </option>,
         ...categoriesArr.map(category => {
            const { name, param } = category;
            return (
               <option value={name} key={param}>
                  {name}
               </option>
            );
         })
      ];
   }
   //Render product main category options
   renderMainCategoryOptions = () => {
      return this.mapOptions(productCategories);
   };
   //Render all category options based on the main category selected
   renderCategoryOptions = formValues => {
      if (!formValues || !formValues.mainCategory) {
         return null;
      }
      const { mainCategory } = formValues;
      const categories = productCategories.find(mainCategoryEntry => mainCategoryEntry.name === mainCategory).categories;
      return this.mapOptions(categories);
   };
   //Render all sub category options based on the category selected
   renderSubCategoryOptions = formValues => {
      if (!formValues || !formValues.category) {
         return null;
      }
      const { mainCategory, category } = formValues;
      const categories = productCategories.find(mainCategoryEntry => mainCategoryEntry.name === mainCategory).categories;
      if (categories.length > 0) {
         const categoryObj = categories.find(categoryEntry => categoryEntry.name === category);
         if (categoryObj) {
            return this.mapOptions(categoryObj.subCategories);
         }
      }
   };
   onSubmit = formValues => {
      const { isSignedIn } = this.props;
      if (!isSignedIn) {
         this.setState({ askSignIn: true });
      } else {
         this.props.createShop(formValues);
      }
   };
   renderSignInMessage() {
      return this.state.askSignIn ? <div className="shop-create__ask-sign-in">You need to sign in</div> : null;
   }
   renderSeedInput = ({ input }) => {
      return <input {...input} className="shop-create__seed-input" placeholder="No. of Seed Rounds" />;
   };
   onSeedClick = () => {
      this.props.seedShops();
   };
   render() {
      const { formValues } = this.props;
      return (
         <div className="shop-create">
            <h1 className="shop-create__header">Create Shop</h1>
            <p className="shop-create__description">Let's get started! Tell us about you and your shop.</p>
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="shop-create__form">
               <h3 className="shop-create__sub-header">Shop</h3>
               <Field name="shopName" component={this.renderInput} label="Name of Shop" placeholder="Enter your Shop Name" />
               <h3 className="shop-create__sub-header">Product</h3>
               <Field name="productName" label="Name" component={this.renderInput} placeholder="Enter your Product Name" />
               <Field name="productImage" label="Image URL" component={this.renderInput} placeholder="Enter an Image Url" />
               <Field name="productPrice" label="Price ($)" component={this.renderInput} placeholder="Enter a Price" />
               <div className="shop-create__field-drop-down">
                  <label className="shop-create__label">Category</label>
                  <div className="shop-create__drop-downs">
                     <Field
                        name="mainCategory"
                        renderFunction={this.renderMainCategoryOptions}
                        component={this.renderDropDown}
                        className="shop-create__drop-down"
                        key="main-cat"
                     />
                     <Field
                        name="category"
                        renderFunction={this.renderCategoryOptions}
                        formValues={formValues}
                        component={this.renderDropDown}
                        className="shop-create__drop-down"
                        key="cat"
                     />
                     <Field
                        name="subCategory"
                        renderFunction={this.renderSubCategoryOptions}
                        formValues={formValues}
                        component={this.renderDropDown}
                        className="shop-create__drop-down"
                        key="sub-cat"
                     />
                  </div>
               </div>
               <div className="shop-create__buttons">
                  <button className="shop-create__button">
                     Submit
                     {this.renderSignInMessage()}
                  </button>
                  <div className="shop-create__seed-button" onClick={this.onSeedClick}>
                     Seed
                  </div>
                  <Field name="seedRounds" component={this.renderSeedInput} />
               </div>
            </form>
         </div>
      );
   }
}
const validate = formValues => {
   const errors = {};
   if (!formValues.shopName) {
      errors.shopName = 'Please enter a name for your shop';
   }
   if (!formValues.productName) {
      errors.productName = 'Your product must have a name';
   }
   if (!formValues.productImage) {
      errors.productImage = 'Insert an url to a picture representing your product';
   }
   if (!formValues.productPrice) {
      errors.productPrice = 'Key in a reasonable price :)';
   }
   if (!formValues.mainCategory) {
      errors.mainCategory = 'Choose at least one category that best describes your product';
   }
   return errors;
};
const mapStateToProps = state => {
   if (!state.form.shopCreate || !state.form.shopCreate.values) {
      return { formValues: null, isSignedIn: state.auth.isSignedIn };
   }
   return { formValues: state.form.shopCreate.values, isSignedIn: state.auth.isSignedIn };
};
const formWrapped = reduxForm({ form: 'shopCreate', validate })(ShopCreate);
export default connect(
   mapStateToProps,
   { createShop, seedShops }
)(formWrapped);
