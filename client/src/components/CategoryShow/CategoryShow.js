import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchShops, selectCategory } from '../../actions';
import Shop from '../Shop/Shop';
import './CategoryShow.css';

class CategoryShow extends Component {
   state = {
      currentCategory: ''
   };
   componentDidMount() {
      const { category } = this.props.match.params;
      this.props.fetchShops(category);
      this.props.selectCategory(category);
      this.setState({ currentCategory: category });
   }
   static getDerivedStateFromProps(props, state) {
      const { category } = props.match.params;
      if (category !== state.currentCategory) {
         props.fetchShops(category);
         props.selectCategory(category);
         return { currentCategory: category };
      }
   }
   renderShops() {
      const { shops, currentUserId } = this.props;
      return shops.map(shop => {
         return <Shop shop={shop} key={shop._id} currentUserId={currentUserId} />;
      });
   }
   render() {
      const {
         category: { name }
      } = this.props;
      return (
         <div className="category-show">
            <div className="category-show__header">{name}</div>
            <div className="category-show__shops">{this.renderShops()}</div>
         </div>
      );
   }
}
const mapStateToProps = state => {
   return { shops: state.shops, currentUserId: state.auth.userDetails.userId, category: state.category };
};
export default connect(
   mapStateToProps,
   { fetchShops, selectCategory }
)(CategoryShow);
