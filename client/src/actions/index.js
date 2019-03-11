import axios from 'axios';
import history from '../history';
import { loopSeedShop, flattenCategories, getNumberOfSeedRounds } from './seedHelperFunctions';

export const selectCategory = (name, param) => {
   return {
      type: 'SELECTED_CATEGORY',
      payload: { name, param }
   };
};

export const fetchShops = category => async dispatch => {
   const response = await axios.get(`/shops/${category}`);
   dispatch({ type: 'FETCH_SHOPS', payload: response.data });
};

export const createShop = ({ shopName, productName, productImage, productPrice, ...rest }) => async (dispatch, getState) => {
   const ownerId = getState().auth.userDetails.userId;
   //Combine the selected categories into an array
   const categoriesName = Object.values(rest);
   //['Clothing & Shoes', ...] -> ['clothing-and-shoes', ...]
   const categoriesParam = categoriesName.map(name => {
      var param = name.replace(/\s/g, '-').toLowerCase();
      param = param.replace(/&/g, 'and');
      param = param.replace(/'/g, '');
      return param;
   });
   const formattedForm = {
      shopName,
      productName,
      productImage,
      productPrice,
      categoriesName,
      categoriesParam,
      ownerId
   };
   const createdShop = await axios.post('/shops', formattedForm);
   console.log(createdShop);
   dispatch({ type: 'CREATE_SHOP', payload: createdShop.data });
   history.push(`/category/${categoriesParam[0]}`);
};

export const seedShops = () => async (dispatch, getState) => {
   const ownerId = getState().auth.userDetails.userId;
   //Get an array of all possible categories
   const flattenedCategories = flattenCategories();
   console.log('Flattened Categories', flattenedCategories);
   //Get the number of rounds each category should be seeded
   const numberOfSeed = getNumberOfSeedRounds(getState);
   //Make looped POST requests to the server to create hundred of shops automatically
   //Using Faker NPM to generate fake data
   loopSeedShop(flattenedCategories, numberOfSeed, ownerId)
      .then(createdShops => {
         console.log('Created Shops', createdShops);
         dispatch({ type: 'SEED_SHOPS' });
      })
      .catch(err => console.log(err));
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
