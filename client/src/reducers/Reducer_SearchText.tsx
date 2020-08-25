import { SET_SEARCH_TEXT } from '../actions/types';

/**
 * Reducer to handle search text
 */
export default function(state = { text: '' }, action: any) {
  switch (action.type) {
    case SET_SEARCH_TEXT:
      return action.payload;
  }
  return state;
}
