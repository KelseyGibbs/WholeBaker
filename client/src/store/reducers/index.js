import { combineReducers } from 'redux';
import productsReducer from './products';
import cartReducer from './cart'; 
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  auth: authReducer,
  errors: errorReducer
});

export default rootReducer;
