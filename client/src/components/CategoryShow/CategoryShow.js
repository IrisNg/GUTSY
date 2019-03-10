import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchShops } from '../../actions';
import Shop from '../Shop/Shop';
import './CategoryShow.css';

class CategoryShow extends Component {
   state = {
      currentCategory: ''
   };
   componentDidMount() {
      this.props.fetchShops(this.props.match.params.category);
      this.setState({ currentCategory: this.props.match.params.category });
   }
   static getDerivedStateFromProps(props, state) {
      if (props.match.params.category !== state.currentCategory) {
         props.fetchShops(props.match.params.category);
         return { currentCategory: props.match.params.category };
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
   { fetchShops }
)(CategoryShow);
