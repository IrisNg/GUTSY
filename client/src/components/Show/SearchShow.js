import React, { Component } from 'react';
import { connect } from 'react-redux';
import Show from './Show';

class SearchShow extends Component {
   render() {
      const { searchTerm } = this.props;
      return (
         <div>
            <Show name={`Showing search results for '${searchTerm}'`} />
         </div>
      );
   }
}
const mapStateToProps = state => {
   return { searchTerm: state.searchTerm };
};
export default connect(mapStateToProps)(SearchShow);
