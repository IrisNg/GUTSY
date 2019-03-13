import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { selectedCategoryReducer } from './categoryReducer';
import searchTermReducer from './searchReducer';
import { shopReducer } from './shopReducer';
import authReducer from './authReducer';

export default combineReducers({
   form: formReducer,
   category: selectedCategoryReducer,
   searchTerm: searchTermReducer,
   shops: shopReducer,
   auth: authReducer
});
