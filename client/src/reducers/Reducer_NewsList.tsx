import { NEWS_LIST, SEARCHED_NEWS } from '../actions/types';

/**
 * Reducer to hanlde news list data
 */
export default function(state = null, action: any) {
  switch (action.type) {
    case NEWS_LIST:
      return action.payload;
    case SEARCHED_NEWS:
      return action.payload;
  }
  return state;
}
