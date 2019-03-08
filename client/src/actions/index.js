import axios from 'axios';

export const createShop = ({ shopName, productName, productImage, productPrice, ...rest }) => async dispatch => {
   const categoriesName = Object.values(rest);
   const categoriesParam = categoriesName.map(name => {
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
