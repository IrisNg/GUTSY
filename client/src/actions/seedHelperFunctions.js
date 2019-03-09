import axios from 'axios';
import Faker from 'faker';
import productCategories from '../components/NavigationBar/productCategories';

export const loopCreateShop = async (flattenedCategories, numberOfSeed) => {
   var createdShops = [];
   //Number of rounds to seed categories
   //Make a POST request to the server for each category
   for (let i = 1; i <= numberOfSeed; i++) {
      for (let category of flattenedCategories) {
         let formattedForm = {
            shopName: Faker.company.companyName(),
            productPrice: Faker.commerce.price(),
            productName: Faker.commerce.productName(),
            productImage: Faker.image.fashion(),
            categoriesName: [category.name],
            categoriesParam: [category.param]
         };
         let createdShop = await axios.post('/shops', formattedForm);
         createdShops = [...createdShops, createdShop.data];
      }
      console.log(`round ${i}`, createdShops);
   }
   return createdShops;
};

//Flatten the nested array from productCategories file into a single layer array -> [{name: '', param: ''}, {category}, ...]
export const flattenCategories = () => {
   const flattenedCategories = [];
   for (let mainCategory of productCategories) {
      flattenedCategories.push({ name: mainCategory.name, param: mainCategory.param });
      if (mainCategory.categories.length > 0) {
         for (let category of mainCategory.categories) {
            flattenedCategories.push({ name: category.name, param: category.param });
            if (category.subCategories && category.subCategories.length > 0) {
               for (let subCategory of category.subCategories) {
                  flattenedCategories.push({ name: subCategory.name, param: subCategory.param });
               }
            }
         }
      }
   }
   return flattenedCategories;
};

export const getNumberOfSeedRounds = (getState) => {
   //Get inputted number of seed rounds from redux-state
   var formValues = getState().form.shopCreate;
   var numberOfSeed = 1;
   //Check if user actually inputted a value for seedRounds first
   if (formValues.values && formValues.values.seedRounds) {
      const { seedRounds } = formValues.values;
      //Only use the inputted seed rounds if it is between 0 ~ 5
      if (seedRounds > 0 && seedRounds < 5) {
         numberOfSeed = seedRounds;
      }
   }
   return numberOfSeed;
};
