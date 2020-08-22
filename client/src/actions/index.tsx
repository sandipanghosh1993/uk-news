import { NEWS_LIST, SEARCHED_NEWS } from './types';
import axios from 'axios';

const ROOT_URL = 'http://localhost:8000/';

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
    const response = await axios.post(ROOT_URL, { text, language: 'en' });
    return {
      type: SEARCHED_NEWS,
      payload: response
    };
  } catch (error) {
    console.error(error);
  }
}
