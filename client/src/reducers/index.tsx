import { combineReducers } from 'redux';
import NewsListReducer from './Reducer_NewsList';
import FullArticleReducer from './Reducer_FullArticle';
import FullArticleContentReducer from './Reducer_FullArticleContent';

const rootReducer = combineReducers({
  newsList: NewsListReducer,
  fullArticle: FullArticleReducer,
  fullArticleContent: FullArticleContentReducer
});

export default rootReducer;
