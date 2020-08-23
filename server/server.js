require('./config/config');
const express = require('express');
const fetch = require('node-fetch');
//const bodyParser = require('body-parser');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('085579c16f7a4c43b7ed23a199f8305e');

const app = express();
const port = process.env.PORT;

// app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

const filterArticle = el =>
  el.author && el.title && el.description && el.urlToImage && el.publishedAt;

app.get('/', async (req, res) => {
  try {
    const { pageSize, language, country } = req.query;
    const headlines = await newsapi.v2.topHeadlines({
      pageSize,
      language,
      country
    });
    const newList = headlines.articles.filter(filterArticle);
    return res.status(200).send(newList);
  } catch (err) {
    return res.status(500).send('Server Error!');
  }
});

app.get('/search', async (req, res) => {
  try {
    const { text, language } = req.query;
    const headlines = await newsapi.v2.everything({
      q: text,
      language
    });
    const newList = headlines.articles.filter(filterArticle);
    return res.status(200).send(newList);
  } catch (err) {
    return res.status(500).send('Server Error!');
  }
});

app.get('/fullarticle', async (req, res) => {
  try {
    const { url } = req.query;
    const response = await fetch(url);
    const body = await response.text();
    res.status(200).send(body);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Server Error!');
  }
});

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
