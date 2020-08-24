import FullArticleContentReducer from './Reducer_FullArticleContent';
import { FULL_ARTICLE_CONTENT } from '../actions/types';

describe('FullArticleContent Reducer', () => {
  const data = 'Fake_Data';
  it('should handle action with unknown type', () => {
    expect(FullArticleContentReducer(undefined, {})).toBeNull();
  });

  it('should handle action of type FULL_ARTICLE_CONTENT', () => {
    const action = { type: FULL_ARTICLE_CONTENT, payload: data };
    expect(FullArticleContentReducer(undefined, action)).toBe(data);
  });
});
