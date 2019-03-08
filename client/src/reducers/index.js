import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { shopReducer } from './shopReducer';

export default combineReducers({
   form: formReducer,
   shops: shopReducer
});
