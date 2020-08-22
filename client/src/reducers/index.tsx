import { combineReducers } from 'redux';
import NewsListReducer from './Reducer_NewsList';

const rootReducer = combineReducers({
  newsList: NewsListReducer
});

export default rootReducer;
