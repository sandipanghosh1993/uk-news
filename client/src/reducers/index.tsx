import { combineReducers } from 'redux';
import NewsListReducer from './Reducer_NewsList';
import FullArticleReducer from './Reducer_FullArticle';
import FullArticleContentReducer from './Reducer_FullArticleContent';
import SearchTextReducer from './Reducer_SearchText';

const rootReducer = combineReducers({
  newsList: NewsListReducer,
  fullArticle: FullArticleReducer,
  fullArticleContent: FullArticleContentReducer,
  searchText: SearchTextReducer
});

export default rootReducer;
