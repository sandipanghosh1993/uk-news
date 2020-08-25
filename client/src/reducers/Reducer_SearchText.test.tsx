import SearchTextReducer from './Reducer_SearchText';
import { SET_SEARCH_TEXT } from '../actions/types';

describe('SearchText Reducer', () => {
  const data = 'Fake_Data';
  it('should handle action with unknown type', () => {
    expect(SearchTextReducer(undefined, {}).text).toEqual('');
  });

  it('should handle action of type SET_SEARCH_TEXT', () => {
    const action = { type: SET_SEARCH_TEXT, payload: data };
    expect(SearchTextReducer(undefined, action)).toBe(data);
  });
});
