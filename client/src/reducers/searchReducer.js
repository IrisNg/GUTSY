export default (state = null, action) => {
   switch (action.type) {
      case 'FETCH_SEARCHES':
         return action.payload.searchTerm;
      default:
         return state;
   }
};
