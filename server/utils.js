const fetch = require('node-fetch');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('085579c16f7a4c43b7ed23a199f8305e');

const getTopHeadlines = async (pageSize, language, country) => {
  const headlines = await newsapi.v2.topHeadlines({
    pageSize,
    language,
    country
  });
  return headlines;
};

const getSearchedHeadlines = async (text, language) => {
  const headlines = await newsapi.v2.everything({
    q: text,
    language
  });
  return headlines;
};

const getFullArticleContent = async url => {
  const response = await fetch(url);
  const body = await response.text();
  return body;
};

const filterArticle = el =>
  el.source.name &&
  el.author &&
  el.title &&
  el.description &&
  el.urlToImage &&
  el.url &&
  el.publishedAt;

module.exports = {
  getTopHeadlines,
  getSearchedHeadlines,
  getFullArticleContent,
  filterArticle
};
