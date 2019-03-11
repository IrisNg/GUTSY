import axios from 'axios';
import Faker from 'faker';
import productCategories from '../components/NavigationBar/productCategories';

//Unsplash api keys
//241dc288805f06bd42fa533605ecee15d51efcbee48ed56795546b7ad260a22e
//00723b1f2243e6f09ab1e1c672d41b226aa3a1f9d925e66b985b6b4f1af6f7f9
//31d69f18309f38a06f4ba0bdd80b02d8923e9fb8346abfa86fa62c7a87090ca4
//74cb2ec52ba0abd5742b18e3bd605e6234adb06575e0032c68ec2843b1201e71
//03c1a7de3a21646c174a65ac83e63305bf0218c3db98f535f56beea157bf2b22
//93379ab06bfd41ea4b27440a1e2d7d76c1ea3d91245b7952b17222f8f7d281bb
//5a0c866a06a1917ee16b8299423796e7a6a2184a73f828f483f81704a013cad8

export const loopSeedShop = (flattenedCategories, numberOfSeed, ownerId) => {
   var createdShops = [];
   //Number of rounds to seed categories
   for (let i = 1; i <= numberOfSeed; i++) {
      //Make a POST request to the server for each category
      for (let i = 0; i < flattenedCategories.length - 1; i++) {
         let category = flattenedCategories[i];
         var createdShop;
         if (i < 20) {
            //Limited by Unsplash api to only be able to make 50 requests per api key
            createdShop = seedShop(category, ownerId, '241dc288805f06bd42fa533605ecee15d51efcbee48ed56795546b7ad260a22e');
         } else if (i < 40) {
            createdShop = seedShop(category, ownerId, '00723b1f2243e6f09ab1e1c672d41b226aa3a1f9d925e66b985b6b4f1af6f7f9');
         } else if (i < 60) {
            createdShop = seedShop(category, ownerId, '31d69f18309f38a06f4ba0bdd80b02d8923e9fb8346abfa86fa62c7a87090ca4');
         } else if (i < 80) {
            createdShop = seedShop(category, ownerId, '74cb2ec52ba0abd5742b18e3bd605e6234adb06575e0032c68ec2843b1201e71');
         } else if (i < 100) {
            createdShop = seedShop(category, ownerId, '03c1a7de3a21646c174a65ac83e63305bf0218c3db98f535f56beea157bf2b22');
         } else if (i < 120) {
            createdShop = seedShop(category, ownerId, '93379ab06bfd41ea4b27440a1e2d7d76c1ea3d91245b7952b17222f8f7d281bb');
         } else {
            createdShop = seedShop(category, ownerId, '5a0c866a06a1917ee16b8299423796e7a6a2184a73f828f483f81704a013cad8');
         }
         createdShops = [...createdShops, createdShop.data];
      }
   }
   return createdShops;
};
const seedShop = async (category, ownerId, apiKey) => {
   //Generate a fake product name
   const productName = Faker.commerce.productName();
   //Convert this product name to a query
   const query = productName.replace(' ', '-');
   //Use Unsplash API to search for a random image using this fake product name
   const productImageResponse = await axios.get('https://api.unsplash.com/search/photos', {
      params: { per_page: 1, orientation: 'landscape', query },
      headers: { Authorization: `Client-ID ${apiKey}` }
   });
   const productImage = productImageResponse.data.results[0].urls.regular;

   const formattedForm = {
      shopName: Faker.company.companyName(),
      productPrice: Faker.commerce.price(),
      productName,
      productImage,
      categoriesName: [category.name],
      categoriesParam: [category.param],
      ownerId
   };
   //Post to server
   const createdShop = await axios.post('/shops', formattedForm);
   console.log(createdShop);
   return createdShop;
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

export const getNumberOfSeedRounds = getState => {
   //Get inputted number of seed rounds from redux-state
   var formValues = getState().form.shopCreate;
   var numberOfSeed = 1;
   //Check if user actually inputted a value for seedRounds first
   if (formValues.values && formValues.values.seedRounds) {
      const { seedRounds } = formValues.values;
      //Only use the inputted seed rounds if it is between 0 ~ 5
      if (seedRounds > 0 && seedRounds <= 2) {
         numberOfSeed = seedRounds;
      }
   }
   return numberOfSeed;
};
