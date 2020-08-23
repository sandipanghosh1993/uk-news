import {
  NEWS_LIST,
  SEARCHED_NEWS,
  DISPLAY_FULL_ARTICLE,
  FULL_ARTICLE_CONTENT
} from './types';
import axios from 'axios';

const ROOT_URL = 'http://localhost:8000';

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
  }
}

export function resetContent() {
  return {
    type: FULL_ARTICLE_CONTENT,
    payload: null
  };
}
