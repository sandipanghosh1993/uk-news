require('./config/config');
const express = require('express');
const utils = require('./utils');

const app = express();
const port = process.env.PORT;

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

app.get('/', async (req, res) => {
  try {
    const { pageSize, language, country } = req.query;
    const headlines = await utils.getTopHeadlines(pageSize, language, country);
    const filteredNews = headlines.articles.filter(utils.filterArticle);
    return res.status(200).send(filteredNews);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server Error!');
  }
});

app.get('/search', async (req, res) => {
  try {
    const { text, language } = req.query;
    const headlines = await utils.getSearchedHeadlines(text, language);
    const filteredNews = headlines.articles.filter(utils.filterArticle);
    return res.status(200).send(filteredNews);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server Error!');
  }
});

app.get('/fullarticle', async (req, res) => {
  try {
    const { url } = req.query;
    const body = await utils.getFullArticleContent(url);
    res.status(200).send(body);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Server Error!');
  }
});

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});

module.exports = { app };
