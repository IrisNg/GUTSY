import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { fetchSearches } from '../../actions';

export class SearchBar extends Component {
   state = {
      prompt: 'Search for items or shops'
   };
   renderInput = ({ input, placeholder }) => {
      return <input {...input} className="search-bar__input" placeholder={placeholder} />;
   };
   onSearchClick = formValues => {
      if (formValues.searchTerm) {
         this.setState({ prompt: 'Search for items or shops' });
         this.props.fetchSearches(formValues.searchTerm);
      } else {
         this.setState({ prompt: 'Type Something' });
      }
   };
   render() {
      return (
         <form className="search-bar" onKeyPress={event => (event.key === 'Enter' ? this.props.handleSubmit(this.onSearchClick) : null)}>
            <Field name="searchTerm" component={this.renderInput} placeholder={this.state.prompt} />
            <button className="search-bar__button" onClick={this.props.handleSubmit(this.onSearchClick)}>
               Search
            </button>
         </form>
      );
   }
}
const formWrapped = reduxForm({ form: 'searchBar' })(SearchBar);
export default connect(
   null,
   { fetchSearches }
)(formWrapped);
