import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import productCategories from './NavigationBar/productCategories';
import { createShop } from '../actions';

import './ShopCreate.css';

class ShopCreate extends React.Component {
   //Render any submit validation error
   renderError({ touched, error }) {
      if (touched && error) {
         return <div>{error}</div>;
      }
   }
   //Render text input wired to redux-form
   renderInput = ({ input, label, meta }) => {
      return (
         <div className="shop-create__field">
            <label className="shop-create__label">{label}</label>
            <input {...input} className="shop-create__input"/>
            {this.renderError(meta)}
         </div>
      );
   };
   //Render drop down wired to redux-form
   renderDropDown = ({ input, meta, renderFunction }) => {
      return (
         <div>
            <select {...input}>{renderFunction()}</select>
            {this.renderError(meta)}
         </div>
      );
   };
   //Map category options based on the Array passed in
   mapOptions(categoriesArr) {
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
   renderCategoryOptions = () => {
      const { formValues } = this.props;
      if (!formValues || !formValues.mainCategory) {
         return null;
      }
      const { mainCategory } = formValues;
      const categories = productCategories.find(mainCategoryEntry => mainCategoryEntry.name === mainCategory)
         .categories;
      return this.mapOptions(categories);
   };
   //Render all sub category options based on the category selected
   renderSubCategoryOptions = () => {
      const { formValues } = this.props;
      if (!formValues || !formValues.category) {
         return null;
      }
      const { mainCategory, category } = formValues;
      const categories = productCategories.find(mainCategoryEntry => mainCategoryEntry.name === mainCategory)
         .categories;
      if (categories.length > 0) {
         const categoryObj = categories.find(categoryEntry => categoryEntry.name === category);
         if (categoryObj) {
            return this.mapOptions(categoryObj.subCategories);
         }
      }
   };
   onSubmit = formValues => {
      this.props.createShop(formValues);
   };
   render() {
      return (
         <div className="shop-create">
            <h1 className="shop-create__header">Create Shop</h1>
            <p className="shop-create__description">Let's get started! Tell us about you and your shop.</p>
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="shop-create__form">
               <Field name="shopName" label="Name of Shop" component={this.renderInput} />
               <h3>Product</h3>
               <Field name="productName" label="Name" component={this.renderInput} />
               <Field name="productImage" label="Image URL" component={this.renderInput} />
               <Field name="productPrice" label="Price" component={this.renderInput} />
               <div>
                  <label>Category</label>
                  <Field
                     name="mainCategory"
                     renderFunction={this.renderMainCategoryOptions}
                     component={this.renderDropDown}
                  />
                  <Field name="category" renderFunction={this.renderCategoryOptions} component={this.renderDropDown} />
                  <Field
                     name="subCategory"
                     renderFunction={this.renderSubCategoryOptions}
                     component={this.renderDropDown}
                  />
               </div>
               <button>Submit</button>
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
      return { formValues: null };
   }
   return { formValues: state.form.shopCreate.values };
};
const formWrapped = reduxForm({ form: 'shopCreate', validate })(ShopCreate);
export default connect(
   mapStateToProps,
   { createShop }
)(formWrapped);
