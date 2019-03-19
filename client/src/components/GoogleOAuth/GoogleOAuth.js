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
               //Update initial auth status
               this.onAuthChange(this.auth.isSignedIn.get());
               //Update auth status automatically on subsequent changes
               this.auth.isSignedIn.listen(this.onAuthChange);
            });
      });
   }
   onAuthChange = isSignedIn => {
      //Store the userId, username & userImage in the Redux store if user is Signed In
      if (isSignedIn) {
         const userId = this.auth.currentUser.get().getId();
         const username = this.auth.currentUser
            .get()
            .getBasicProfile()
            .getName();
         const userImage = this.auth.currentUser
            .get()
            .getBasicProfile()
            .getImageUrl();
         this.props.signIn({ userId, username, userImage });
      } else {
         this.props.signOut();
      }
   };
   //Signs user in to OAuth
   onSignIn = () => {
      this.auth.signIn();
   };
   //Signs user out of OAuth
   onSignOut = () => {
      this.auth.signOut();
   };
   renderAuthButton(isSignedIn) {
      if (isSignedIn) {
         return (
            <button onClick={this.onSignOut} className="google-auth">
               <i className="fab fa-google-plus-g" />
               Sign Out
            </button>
         );
      } else {
         return (
            <button onClick={this.onSignIn} className="google-auth">
               <i className="fab fa-google-plus-g" />
               Sign In
            </button>
         );
      }
   }
   render() {
      const { isSignedIn } = this.props;
      return <div>{this.renderAuthButton(isSignedIn)}</div>;
   }
}

export default connect(
   null,
   { signIn, signOut }
)(GoogleOAuth);
