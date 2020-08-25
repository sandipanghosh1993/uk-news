import { DISPLAY_FULL_ARTICLE } from '../actions/types';

/**
 * Reducer to handle data to be shown on full article page apart from the text
 */
export default function(state = null, action: any) {
  switch (action.type) {
    case DISPLAY_FULL_ARTICLE:
      return action.payload;
  }
  return state;
}
