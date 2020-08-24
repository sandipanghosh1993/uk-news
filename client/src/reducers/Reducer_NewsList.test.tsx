import NewsListReducer from './Reducer_NewsList';
import { NEWS_LIST, SEARCHED_NEWS } from '../actions/types';

describe('NewsList Reducer', () => {
  const data = 'Fake_Data';
  it('should handle action with unknown type', () => {
    expect(NewsListReducer(undefined, {})).toBeNull();
  });

  it('should handle action of type NEWS_LIST', () => {
    const action = { type: NEWS_LIST, payload: data };
    expect(NewsListReducer(undefined, action)).toBe(data);
  });

  it('should handle action of type SEARCHED_NEWS', () => {
    const action = { type: SEARCHED_NEWS, payload: data };
    expect(NewsListReducer(undefined, action)).toBe(data);
  });
});
