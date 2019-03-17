import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import productCategories from '../../productCategories';
import { seedShops } from '../../actions';
import Shop from '../Shop/Shop';

import './ShopForm.css';

class ShopForm extends React.Component {
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
         return <div className="shop-form__error">* {error}</div>;
      }
   }
   //Render text input wired to redux-form
   renderInput = ({ input, label, meta, placeholder }) => {
      return (
         <div className="shop-form__field">
            <label className="shop-form__label">{label}</label>
            <div className="shop-form__input-container">
               <input {...input} placeholder={placeholder} className="shop-form__input" />
               {this.renderError(meta)}
            </div>
         </div>
      );
   };
   //Render drop down wired to redux-form
   renderDropDown = ({ input, meta, renderFunction, formValues, key }) => {
      return (
         <div key={key} className="shop-form__drop-down">
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
   onSubmit = () => {
      const { isSignedIn, onSubmit, formValues } = this.props;
      if (!isSignedIn) {
         this.setState({ askSignIn: true });
      } else {
         onSubmit(formValues);
      }
   };
   renderSignInMessage() {
      return this.state.askSignIn ? <div className="shop-form__ask-sign-in">You need to sign in</div> : null;
   }
   renderSeedInput = ({ input }) => {
      return <input {...input} className="shop-form__seed-input" placeholder="No. of Seed Rounds" />;
   };
   onSeedClick = () => {
      this.props.seedShops();
   };
   render() {
      const { formValues, header, description } = this.props;
      return (
         <div className="shop-form">
            <h1 className="shop-form__header">{header}</h1>
            <p className="shop-form__description">{description}</p>
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="shop-form__form">
               <div className="shop-form__form-container">
                  <h3 className="shop-form__sub-header">Shop</h3>
                  <Field name="shopName" component={this.renderInput} label="Name of Shop" placeholder="Enter your Shop Name" />
                  <h3 className="shop-form__sub-header">Product</h3>
                  <Field name="productName" label="Name" component={this.renderInput} placeholder="Enter your Product Name" />
                  <Field name="productImage" label="Image URL" component={this.renderInput} placeholder="Enter an Image Url" />
                  <Field name="productPrice" label="Price ($)" component={this.renderInput} placeholder="Enter a Price" />
                  <div className="shop-form__field-drop-down">
                     <label className="shop-form__label">Category</label>
                     <div className="shop-form__drop-downs">
                        <Field
                           name="mainCategory"
                           renderFunction={this.renderMainCategoryOptions}
                           component={this.renderDropDown}
                           className="shop-form__drop-down"
                           key="main-cat"
                        />
                        <Field
                           name="category"
                           renderFunction={this.renderCategoryOptions}
                           component={this.renderDropDown}
                           className="shop-form__drop-down"
                           formValues={formValues}
                           key="cat"
                        />
                        <Field
                           name="subCategory"
                           renderFunction={this.renderSubCategoryOptions}
                           component={this.renderDropDown}
                           className="shop-form__drop-down"
                           formValues={formValues}
                           key="sub-cat"
                        />
                     </div>
                  </div>
                  <div className="shop-form__buttons">
                     <button className="shop-form__button">
                        Submit
                        {this.renderSignInMessage()}
                     </button>
                     <div className="shop-form__seed-button" onClick={this.onSeedClick}>
                        Seed
                     </div>
                     <Field name="seedRounds" component={this.renderSeedInput} />
                  </div>
               </div>
               <div className="shop-form__preview">
                  <div className="preview__shop-container">
                     <div className="preview__header">Preview</div>
                     <Shop {...formValues} />
                  </div>
               </div>
            </form>
         </div>
      );
   }
}
const validate = ({ shopName, productName, productImage, productPrice, mainCategory }) => {
   const errors = {};
   if (!shopName) {
      errors.shopName = 'Please enter a name for your shop';
   }
   if (!productName) {
      errors.productName = 'Your product must have a name';
   }
   if (!productImage) {
      errors.productImage = 'Insert an url to a picture representing your product';
   }
   if (productPrice && /[^0-9.]|\..*\.|^\./i.test(productPrice)) {
      errors.productPrice = 'Use ONLY numerical values';
   }
   if (!productPrice) {
      errors.productPrice = 'Key in a reasonable price :)';
   }
   if (!mainCategory) {
      errors.mainCategory = 'Choose at least one category that best describes your product';
   }
   return errors;
};

const formWrapped = reduxForm({ form: 'shopForm', validate })(ShopForm);
export default connect(
   null,
   { seedShops }
)(formWrapped);
