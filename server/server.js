require('./config/config');
const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('085579c16f7a4c43b7ed23a199f8305e');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/', async (req, res) => {
  const defaultPageSize = 30;
  const pageSize = req.query.pageSize > defaultPageSize ? req.query.pageSize : defaultPageSize;
  const headlines = await newsapi.v2.topHeadlines({
    pageSize: pageSize,
    language: req.query.language,
    country: req.query.country
  });

  const newList = headlines.articles.reduce((result, el) => {
    if(el.author && el.title && el.description) {
      result.push(el);
    }
    return result;
  }, []);

  return res.status(200).send(newList.slice(0, req.query.pageSize));
});

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
