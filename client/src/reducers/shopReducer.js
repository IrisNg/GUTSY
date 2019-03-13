export const shopReducer = (state = [], action) => {
   switch (action.type) {
      case 'FETCH_SHOPS':
         return [...action.payload];
      case 'FETCH_SEARCHES':
         return [...action.payload.results];
      case 'CREATE_SHOP':
         return [...state, action.payload];
      case 'SEED_SHOPS':
         return state;
      default:
         return state;
   }
};
