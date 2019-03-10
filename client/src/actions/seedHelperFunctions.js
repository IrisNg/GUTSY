import axios from 'axios';
import Faker from 'faker';
import productCategories from '../components/NavigationBar/productCategories';

export const loopCreateShop = async (flattenedCategories, numberOfSeed, ownerId) => {
   var createdShops = [];
   //Number of rounds to seed categories
   //Make a POST request to the server for each category
   for (let i = 1; i <= numberOfSeed; i++) {
      // for (let category of flattenedCategories) {
      const category = flattenedCategories[0];
      //Generate a fake product name
      const productName = Faker.commerce.productName();
      //Convert this product name to a query
      const query = productName.replace(' ', '-');
      //Use Unsplash API to search for a random image using this fake product name
      let productImageResponse = await axios.get('https://api.unsplash.com/search/photos', {
         params: { per_page: 1, orientation: 'landscape', query },
         headers: { Authorization: 'Client-ID 74cb2ec52ba0abd5742b18e3bd605e6234adb06575e0032c68ec2843b1201e71' }
      });
      //241dc288805f06bd42fa533605ecee15d51efcbee48ed56795546b7ad260a22e
      //00723b1f2243e6f09ab1e1c672d41b226aa3a1f9d925e66b985b6b4f1af6f7f9
      //31d69f18309f38a06f4ba0bdd80b02d8923e9fb8346abfa86fa62c7a87090ca4
      //74cb2ec52ba0abd5742b18e3bd605e6234adb06575e0032c68ec2843b1201e71
      let productImage = productImageResponse.data.results[0].urls.regular;

      let formattedForm = {
         shopName: Faker.company.companyName(),
         productPrice: Faker.commerce.price(),
         productName,
         productImage,
         categoriesName: [category.name],
         categoriesParam: [category.param],
         ownerId
      };
      //Post to server
      let createdShop = await axios.post('/shops', formattedForm);
      console.log(createdShop);
      createdShops = [...createdShops, createdShop.data];
      // }
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

export const getNumberOfSeedRounds = getState => {
   //Get inputted number of seed rounds from redux-state
   var formValues = getState().form.shopCreate;
   var numberOfSeed = 1;
   //Check if user actually inputted a value for seedRounds first
   if (formValues.values && formValues.values.seedRounds) {
      const { seedRounds } = formValues.values;
      //Only use the inputted seed rounds if it is between 0 ~ 5
      if (seedRounds > 0 && seedRounds < 50) {
         numberOfSeed = seedRounds;
      }
   }
   return numberOfSeed;
};
