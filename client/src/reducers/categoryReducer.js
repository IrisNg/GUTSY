const INITIAL_STATE = { name: '', param: '' };

export const selectedCategoryReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case 'SELECTED_CATEGORY':
         return action.payload;
      default:
         return state;
   }
};
