import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { shopReducer } from './shopReducer';
import authReducer from './authReducer';

export default combineReducers({
   form: formReducer,
   shops: shopReducer,
   auth: authReducer
});
