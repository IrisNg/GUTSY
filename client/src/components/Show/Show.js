import React, { Component } from 'react';
import { connect } from 'react-redux';
import Shop from '../Shop/Shop';
import './Show.css';

export class Show extends Component {
   renderShops() {
      const { shops, currentUserId } = this.props;
      return shops.map(shop => {
         return <Shop {...shop} key={shop._id} currentUserId={currentUserId} shop={shop} />;
      });
   }
   render() {
      const { name } = this.props;
      return (
         <div className="show">
            <div className="show__header">{name}</div>
            <div className="show__shops">{this.renderShops()}</div>
         </div>
      );
   }
}
const mapStateToProps = state => {
   return { shops: state.shops, currentUserId: state.auth.userDetails.userId };
};
export default connect(mapStateToProps)(Show);
