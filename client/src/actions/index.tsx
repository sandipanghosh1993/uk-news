import {
  NEWS_LIST,
  SEARCHED_NEWS,
  DISPLAY_FULL_ARTICLE,
  FULL_ARTICLE_CONTENT,
  SET_SEARCH_TEXT
} from './types';
import axios from 'axios';

const ROOT_URL = 'http://localhost:8000';

/**
 * Action creator to fetch top headlines
 */
export async function fetchNewsList() {
  try {
    const response = await axios.get(ROOT_URL, {
      params: {
        pageSize: 20,
        language: 'en',
        country: 'gb'
      }
    });
    return {
      type: NEWS_LIST,
      payload: response
    };
  } catch (error) {
    console.error(error);
  }
}

/**
 * Action creator to fetch headlines based on searched text
 */
export async function fetchSearchedNews(text: string) {
  try {
    const response = await axios.get(`${ROOT_URL}/search`, {
      params: { text, language: 'en' }
    });
    return {
      type: SEARCHED_NEWS,
      payload: response
    };
  } catch (error) {
    console.error(error);
  }
}

/**
 * Action creator to send data to the reducer to show full article content
 * apart from text
 */
export function displayFullArticle(
  title: string,
  author: string,
  publishedAt: string,
  urlToImage: string,
  url: string
) {
  return {
    type: DISPLAY_FULL_ARTICLE,
    payload: {
      title,
      author,
      publishedAt,
      urlToImage,
      url
    }
  };
}

/**
 * Action creator to fetch raw html from backend and parse it to extract text
 */
export async function fetchFullArticleContent(url: string) {
  try {
    const response = await axios.get(`${ROOT_URL}/fullarticle`, {
      params: { url }
    });
    const parser = new DOMParser();
    const doc = parser.parseFromString(response.data, 'text/html');
    const pTags: any = doc.body.getElementsByTagName('p');
    let content = '';
    for (const el of pTags) {
      content += ' ' + el.innerText.trim();
    }
    return {
      type: FULL_ARTICLE_CONTENT,
      payload: {
        content
      }
    };
  } catch (error) {
    console.error(error);
    return {
      type: FULL_ARTICLE_CONTENT,
      payload: {
        content: 'ERROR: Unable to fetch content'
      }
    };
  }
}

/**
 * Action creator to reset the full article text
 */
export function resetContent() {
  return {
    type: FULL_ARTICLE_CONTENT,
    payload: null
  };
}

/**
 * Action creator to set search text
 */
export function setSearchText(text: string = '') {
  return {
    type: SET_SEARCH_TEXT,
    payload: { text }
  };
}
