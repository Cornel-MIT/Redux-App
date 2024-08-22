import { combineReducers } from 'redux';
import shoppingListReducer from './shoppingListReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  shoppingList: shoppingListReducer,
  auth: authReducer,
});

export default rootReducer;