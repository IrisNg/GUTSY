export const shopReducer = (state = [], action) => {
   switch (action.type) {
      case 'CREATE_SHOP':
         return [...state, action.payload];
      default:
         return state;
   }
};
