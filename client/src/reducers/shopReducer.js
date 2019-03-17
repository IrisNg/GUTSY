export const shopReducer = (state = [], action) => {
   switch (action.type) {
      case 'FETCH_SHOPS':
         return [...action.payload];
      case 'FETCH_SEARCHES':
         return [...action.payload.results];
      case 'CREATE_SHOP':
         if (action.payload) {
            return [...state, action.payload];
         } else {
            return state;
         }
      case 'SEED_SHOPS':
         return state;
      case 'FETCH_SHOP' || 'UPDATE_SHOP':
         const remainingShops = state.filter(shop => shop._id !== action.payload._id);
         return [...remainingShops, action.payload];
      case 'DELETE_SHOP':
         const shopsExcludeDeleted = state.filter(shop => shop._id !== action.payload);
         return [...shopsExcludeDeleted];
      default:
         return state;
   }
};
