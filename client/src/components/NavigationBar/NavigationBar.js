import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCategory } from '../../actions';
import history from '../../history';
import productCategories from './productCategories';
import GoogleOAuth from '../GoogleOAuth/GoogleOAuth';

import './NavigationBar.css';

class NavigationBar extends React.Component {
   state = {
      activeCategory: null,
      url: history.location.pathname
   };
   //Listen to changes in history, this affects if categories section is showing
   componentDidMount() {
      history.listen(location => {
         this.setState({ url: location.pathname });
      });
   }
   renderUser(userDetails) {
      return userDetails.username ? (
         <li className="main-nav__user">
            <img src={userDetails.userImage} className="main-nav__user-image" />
            {userDetails.username}
         </li>
      ) : null;
   }
   onCategoryClick = (name, param) => {
      this.props.selectCategory(name, param);
      history.push(`/category/${param}`);
   };
   renderMainCategories() {
      return productCategories.map(mainCategory => {
         const { name, param } = mainCategory;
         return (
            <li
               onMouseOver={() => this.onCategoryHover(name)}
               className={this.handleMainCategoryStyle(name)}
               key={param}
               onClick={() => this.onCategoryClick(name, param)}
            >
               {name}
            </li>
         );
      });
   }
   // Show more product categories on hover
   onCategoryHover = activeCategory => {
      const categoryData = productCategories.find(mainCategory => mainCategory.name === activeCategory);
      this.setState({ activeCategory: categoryData });
   };
   renderCategories() {
      if (!this.state.activeCategory) {
         return null;
      }
      return this.state.activeCategory.categories.map(category => {
         const { name, param, subCategories } = category;
         return (
            <li key={param} className="expanded-categories__category">
               <span onClick={() => this.onCategoryClick(name, param)}>{name}</span>
               <ul className="expanded-categories__sub-categories">{this.renderSubCategories(subCategories)}</ul>
            </li>
         );
      });
   }
   renderSubCategories(subCategories) {
      if (!subCategories) {
         return null;
      }
      return subCategories.map(subCategory => {
         const { name, param } = subCategory;
         return (
            <li
               key={param}
               className="expanded-categories__sub-category"
               onClick={() => this.onCategoryClick(name, param)}
               onClick={() => {
                  history.push(`/category/${param}`);
               }}
            >
               {name}
            </li>
         );
      });
   }
   handleCategoriesDisplay() {
      if (this.state.url === '/create-shop') {
         return '--inactive';
      }
      return '';
   }
   handleExpandedCategoriesDisplay() {
      if (!this.state.activeCategory || this.state.activeCategory.categories.length === 0) {
         return '--inactive';
      }
      return '';
   }
   handleMainCategoryStyle(category) {
      const { activeCategory } = this.state;
      if (activeCategory && category === activeCategory.name) {
         return 'main-category--active';
      }
      return '';
   }
   render() {
      const { isSignedIn, userDetails } = this.props.auth;
      return (
         <div className="navigation-bar">
            {/* Main Navigation */}
            <div className="navigation-bar__main-nav">
               <div className="main-nav__primary">
                  {/* Logo */}
                  <h1 className="main-nav__brand">
                     <Link to="/">Gutsy</Link>
                  </h1>
                  {/* Search bar */}
                  <div className="main-nav__search">
                     <input type="text" className="main-nav__search-input" placeholder="Search for items or shops" />
                     <button className="main-nav__search-button">Search</button>
                  </div>
               </div>
               {/* Buttons */}
               <ul className="main-nav__items">
                  <li className="main-nav__sell">
                     <Link to="/create-shop">Sell on Gutsy</Link>
                  </li>
                  {this.renderUser(userDetails)}
                  <li className="main-nav__auth">
                     <i className="fab fa-google-plus-g" />
                     <GoogleOAuth isSignedIn={isSignedIn} />
                  </li>
                  <li className="main-nav__discover">
                     <i className="fas fa-toolbox" />
                     <span>Discover</span>
                  </li>
                  <li className="main-nav__basket">
                     <i className="fas fa-shopping-basket" />
                     <span>Basket</span>
                  </li>
               </ul>
            </div>
            {/* Product Categories */}
            <div className={`navigation-bar__categories${this.handleCategoriesDisplay()}`} onMouseLeave={() => this.setState({ activeCategory: '' })}>
               <ul className="navigation-bar__main-categories">{this.renderMainCategories()}</ul>
               <div className="navigation-bar__expanded-container">
                  <ul className={`navigation-bar__expanded-categories${this.handleExpandedCategoriesDisplay()}`}>{this.renderCategories()}</ul>
               </div>
            </div>
         </div>
      );
   }
}
const mapStateToProps = state => {
   return { auth: state.auth };
};
export default connect(
   mapStateToProps,
   { selectCategory }
)(NavigationBar);