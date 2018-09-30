import { combineReducers } from 'redux';
import listReducer from './list';
// import cardReducer from './card';


export default combineReducers({
  lists: listReducer
  // cards: cardReducer
});
