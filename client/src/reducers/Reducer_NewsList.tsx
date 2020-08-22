import { NEWS_LIST } from '../actions/types';

export default function(state = null, action: any) {
  switch (action.type) {
    case NEWS_LIST:
      return action.payload;
  }
  return state;
}
