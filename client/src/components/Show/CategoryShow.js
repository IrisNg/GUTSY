import React, { Component } from 'react';
import { connect } from 'react-redux';
import Show from './Show';
import { fetchCategoryShops, selectCategory } from '../../actions';

class CategoryShow extends Component {
   state = {
      currentCategory: ''
   };
   componentDidMount() {
      const { category } = this.props.match.params;
      const { param } = this.props.category;
      if (category !== param) {
         this.props.fetchCategoryShops(category);
         this.props.selectCategory(category);
      }
      this.setState({ currentCategory: category });
   }
   static getDerivedStateFromProps(props, state) {
      const { category } = props.match.params;
      if (category !== state.currentCategory) {
         props.fetchCategoryShops(category);
         props.selectCategory(category);
         return { currentCategory: category };
      }
      return null;
   }

   render() {
      const {
         category: { name }
      } = this.props;
      return (
         <div>
            <Show name={name} />
         </div>
      );
   }
}
const mapStateToProps = state => {
   return { category: state.category };
};
export default connect(
   mapStateToProps,
   { fetchCategoryShops, selectCategory }
)(CategoryShow);
