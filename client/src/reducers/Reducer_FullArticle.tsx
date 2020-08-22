import { DISPLAY_FULL_ARTICLE } from '../actions/types';

export default function(state = null, action: any) {
  switch (action.type) {
    case DISPLAY_FULL_ARTICLE:
      return action.payload;
  }
  return state;
}
