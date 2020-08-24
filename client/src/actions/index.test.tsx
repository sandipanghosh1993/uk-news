import {
  NEWS_LIST,
  SEARCHED_NEWS,
  DISPLAY_FULL_ARTICLE,
  FULL_ARTICLE_CONTENT
} from './types';
import {
  fetchNewsList,
  fetchSearchedNews,
  fetchFullArticleContent,
  displayFullArticle,
  resetContent
} from './index';
import axios from 'axios';

describe('Actions', () => {
  describe('fetchNewsList', () => {
    let action: any;
    const responseData = 'Response_Data';
    beforeAll(() => {
      spyOn(axios, 'get').and.callFake(() => {
        return responseData;
      });
      action = fetchNewsList();
    });

    it('should return the correct type', done => {
      action.then((e: any) => {
        expect(e.type).toBe(NEWS_LIST);
        done();
      });
    });

    it('should return the correct payload', done => {
      action.then((e: any) => {
        expect(e.payload).toBe(responseData);
        done();
      });
    });
  });

  describe('fetchSearchedNews', () => {
    let action: any;
    const responseData = 'Response_Data';
    beforeAll(() => {
      spyOn(axios, 'get').and.callFake(() => {
        return responseData;
      });
      action = fetchSearchedNews('bitcoin');
    });

    it('should return the correct type', done => {
      action.then((e: any) => {
        expect(e.type).toBe(SEARCHED_NEWS);
        done();
      });
    });

    it('should return the correct payload', done => {
      action.then((e: any) => {
        expect(e.payload).toBe(responseData);
        done();
      });
    });
  });

  describe('fetchFullArticleContent', () => {
    let action: any;
    const responseData = 'Response_Data';
    beforeAll(() => {
      spyOn(axios, 'get').and.callFake(() => {
        return responseData;
      });
      action = fetchFullArticleContent('https://fakeurl');
    });

    it('should return the correct type', done => {
      action.then((e: any) => {
        expect(e.type).toBe(FULL_ARTICLE_CONTENT);
        done();
      });
    });

    it('should return the correct payload', done => {
      action.then((e: any) => {
        expect(e.payload.content).toBeDefined();
        done();
      });
    });
  });

  describe('displayFullArticle', () => {
    const action = displayFullArticle(
      'title1',
      'author1',
      '01.01.2020',
      'urlToImage',
      'url'
    );
    it('should return the correct type', () => {
      expect(action.type).toBe(DISPLAY_FULL_ARTICLE);
    });

    it('should return the correct payload', () => {
      expect(action.payload.title).toBeDefined();
      expect(action.payload.author).toBeDefined();
      expect(action.payload.publishedAt).toBeDefined();
      expect(action.payload.urlToImage).toBeDefined();
      expect(action.payload.url).toBeDefined();
    });
  });

  describe('resetContent', () => {
    const action = resetContent();
    it('should return the correct type', () => {
      expect(action.type).toBe(FULL_ARTICLE_CONTENT);
    });

    it('should return the correct payload', () => {
      expect(action.payload).toBeNull();
    });
  });
});
