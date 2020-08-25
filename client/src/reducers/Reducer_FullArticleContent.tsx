import { FULL_ARTICLE_CONTENT } from '../actions/types';

/**
 * Reducer to hanlde full article text
 */
export default function(state = null, action: any) {
  switch (action.type) {
    case FULL_ARTICLE_CONTENT:
      return action.payload;
  }
  return state;
}
