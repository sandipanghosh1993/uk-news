import FullArticleReducer from './Reducer_FullArticle';
import { DISPLAY_FULL_ARTICLE } from '../actions/types';

describe('FullArticle Reducer', () => {
  const data = 'Fake_Data';
  it('should handle action with unknown type', () => {
    expect(FullArticleReducer(undefined, {})).toBeNull();
  });

  it('should handle action of type DISPLAY_FULL_ARTICLE', () => {
    const action = { type: DISPLAY_FULL_ARTICLE, payload: data };
    expect(FullArticleReducer(undefined, action)).toBe(data);
  });
});
