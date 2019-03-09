import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../../actions';

class GoogleOAuth extends Component {
   state = { isSignedIn: null };

   componentDidMount() {
      window.gapi.load('client:auth2', () => {
         window.gapi.client
            .init({
               clientId: '556924746909-bc23vnn4gpd6nc3fem85tqgfbk6kpfpj.apps.googleusercontent.com',
               scope: 'email'
            })
            .then(() => {
               this.auth = window.gapi.auth2.getAuthInstance();
               this.onAuthChange(this.auth.isSignedIn.get());
               this.auth.isSignedIn.listen(this.onAuthChange);
            });
      });
   }
   onAuthChange = (isSignedIn) => {
      if (isSignedIn) {
         this.props.signIn(this.auth.currentUser.get().getId());
      } else {
         this.props.signOut();
      }
   };
   onSignIn = () => {
      this.auth.signIn();
   };
   onSignOut = () => {
      this.auth.signOut();
   };
   render() {
      return <div />;
   }
}
export default connect(
   null,
   { signIn, signOut }
)(GoogleOAuth);
