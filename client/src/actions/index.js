import axios from 'axios';
import history from '../history';
import { loopSeedShop, getNumberOfSeedRounds } from './seedHelperFunctions';
import productCategories from '../flatProductCategories';

export const selectCategory = param => {
   //Use the param to find the name of the category also
   const category = productCategories.find(category => category.param === param);
   return {
      type: 'SELECTED_CATEGORY',
      payload: category
   };
};

export const fetchShops = category => async dispatch => {
   const response = await axios.get(`/categories/${category}`);
   dispatch({ type: 'FETCH_SHOPS', payload: response.data });
};

export const fetchSearches = searchTerm => async dispatch => {
   const response = await axios.post('/shops/searches', { searchTerm });
   dispatch({ type: 'FETCH_SEARCHES', payload: { searchTerm, results: response.data } });
   history.push('/search');
};
//Helper function
const combineCategories = formValues => {
   const { mainCategory, category, subCategory } = formValues;
   //Combine the selected categories into an array
   const categoriesName = [mainCategory];
   if (category) {
      categoriesName.push(category);
   }
   if (subCategory) {
      categoriesName.push(subCategory);
   }
   //['Clothing & Shoes', ...] -> ['clothing-and-shoes', ...]
   const categoriesParam = categoriesName.map(name => {
      var param = name.replace(/\s/g, '-').toLowerCase();
      param = param.replace(/&/g, 'and');
      param = param.replace(/'/g, '');
      return param;
   });
   return { categoriesName, categoriesParam };
};
export const createShop = formValues => async (dispatch, getState) => {
   const ownerId = getState().auth.userDetails.userId;
   const combinedCategories = combineCategories(formValues);
   const formattedForm = {
      ...formValues,
      ...combinedCategories,
      ownerId
   };
   const createdShop = await axios.post('/shops', formattedForm);
   console.log('createdShop', createdShop);
   //Store the created shop only if it is of the last visited category
   if (createdShop.data.categoriesName.includes(getState().category.name)) {
      dispatch({ type: 'CREATE_SHOP', payload: createdShop.data });
   } else {
      dispatch({ type: 'CREATE_SHOP' });
   }
   history.goBack();
};

export const seedShops = () => async (dispatch, getState) => {
   const ownerId = getState().auth.userDetails.userId;
   //Get the number of rounds each category should be seeded
   const numberOfSeed = getNumberOfSeedRounds(getState);
   //Make looped POST requests to the server to create hundred of shops automatically
   //Using Faker NPM to generate fake data
   loopSeedShop(numberOfSeed, ownerId)
      .then(createdShops => {
         console.log('Created Shops', createdShops);
         dispatch({ type: 'SEED_SHOPS' });
      })
      .catch(err => console.log(err));
};
export const fetchShop = id => async dispatch => {
   const response = await axios.get(`/shops/${id}`);
   dispatch({ type: 'FETCH_SHOP', payload: response.data });
};
export const updateShop = (id, formValues) => async dispatch => {
   const combinedCategories = combineCategories(formValues);
   const formattedForm = {
      ...formValues,
      ...combinedCategories
   };
   const updatedShop = await axios.put(`/shops/${id}`, formattedForm);
   console.log('updatedShop', updatedShop.data);
   dispatch({ type: 'UPDATE_SHOP', payload: updatedShop.data });
   history.goBack();
};

export const deleteShop = id => async dispatch => {
   await axios.delete(`/shops/${id}`);
   console.log('shop deleted!');
   dispatch({ type: 'DELETE_SHOP', payload: id });
   history.goBack();
};
export const addShopToBasket = shop => {
   return {
      type: 'SHOP_BASKET',
      payload: shop
   };
};

export const signIn = userDetails => {
   return {
      type: 'SIGN_IN',
      payload: userDetails
   };
};
export const signOut = () => {
   return {
      type: 'SIGN_OUT'
   };
};

