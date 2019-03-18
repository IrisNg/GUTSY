import React from 'react';
import { connect } from 'react-redux';
import { fetchShops } from '../../actions';
import Shop from '../Shop/Shop';

class Latest extends React.Component {
   componentDidMount() {
      this.props.fetchShops();
   }

   renderLatestItems() {
      const { latest } = this.props;
      return latest.map(shop => <Shop {...shop} shop={shop} key={`latest ${shop._id}`} />);
   }
   render() {
      return (
         <div className="latest">
            <h2 className="latest__header">Latest right now</h2>
            <div className="latest__shops">{this.renderLatestItems()}</div>
         </div>
      );
   }
}
const mapStateToProps = state => {
   return { latest: state.shops };
};
export default connect(
   mapStateToProps,
   { fetchShops }
)(Latest);
