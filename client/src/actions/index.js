import axios from 'axios';
import { loopCreateShop, flattenCategories, getNumberOfSeedRounds } from './seedHelperFunctions';

export const fetchShops = (category) => async (dispatch) => {
   const response = await axios.get(`/shops/${category}`);
   dispatch({ type: 'FETCH_SHOPS', payload: response.data });
};

export const createShop = ({ shopName, productName, productImage, productPrice, ...rest }) => async (dispatch) => {
   //Combine the selected categories into an array
   const categoriesName = Object.values(rest);
   //['Clothing & Shoes', ...] -> ['clothing-and-shoes', ...]
   const categoriesParam = categoriesName.map((name) => {
      var param = name.replace(/\s/g, '-').toLowerCase();
      param = param.replace(/&/g, 'and');
      param = param.replace(/'/g, '');
      return param;
   });
   const formattedForm = { shopName, productName, productImage, productPrice, categoriesName, categoriesParam };
   const createdShop = await axios.post('/shops', formattedForm);
   console.log(createdShop);
   dispatch({ type: 'CREATE_SHOP', payload: createdShop.data });
};

export const seedShops = () => async (dispatch, getState) => {
   //Get an array of all possible categories
   const flattenedCategories = flattenCategories();
   console.log('Flattened Categories', flattenedCategories);
   //Get the number of rounds each category should be seeded
   const numberOfSeed = getNumberOfSeedRounds(getState);
   //Make looped POST requests to the server to create hundred of shops automatically
   //Using Faker NPM to generate fake data
   loopCreateShop(flattenedCategories, numberOfSeed)
      .then((createdShops) => {
         console.log('Created Shops', createdShops);
         dispatch({ type: 'SEED_SHOPS' });
      })
      .catch((err) => console.log(err));
};

export const signIn = (userId) => {
   return {
      type: 'SIGN_IN',
      payload: userId
   };
};
export const signOut = () => {
   return {
      type: 'SIGN_OUT'
   };
};
