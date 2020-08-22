import { NEWS_LIST } from './types';
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
    //console.log(response);
    return {
      type: NEWS_LIST,
      payload: response
    };
  } catch (error) {
    console.error(error);
  }
}
