import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchShops } from '../../actions';

class CategoryShow extends Component {
   componentDidMount() {
      this.props.fetchShops(this.props.match.params.category);
   }
   render() {
      const { shops } = this.props;
      return <div>CategoryShow</div>;
   }
}
const mapStateToProps = (state) => {
   return { shops: state.shops };
};
export default connect(
   mapStateToProps,
   { fetchShops }
)(CategoryShow);
