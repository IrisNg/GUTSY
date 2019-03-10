const INITIAL_STATE = {
   isSignedIn: null,
   userDetails: { userId: null, username: null, userImage: null }
};
export default (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case 'SIGN_IN':
         return { ...state, isSignedIn: true, userDetails: { ...action.payload } };
      case 'SIGN_OUT':
         return { ...state, isSignedIn: false, userDetails: { userId: null, username: null, userImage: null } };
      default:
         return state;
   }
};
