require('./config/config');
const express = require('express');
const utils = require('./utils/commonUtils');

const app = express();
const port = process.env.PORT;

/**
 * Add headers
 */
app.use((req, res, next) => {
  // Website we wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods we wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  // Request headers we wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  // Set to true if we need the website to include cookies in the requests sent
  // to the API (e.g. in case we use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

/**
 * Route to get top headlines
 */
app.get('/', async (req, res) => {
  try {
    const { pageSize, language, country } = req.query;
    const headlines = await utils.getTopHeadlines(pageSize, language, country);
    const filteredNews = headlines.articles.filter(utils.filterArticle);
    return res.status(200).send(filteredNews);
  } catch (err) {
    return res.status(500).send('Server Error!');
  }
});

/**
 * Route to get headlines based on search text
 */
app.get('/search', async (req, res) => {
  try {
    const { text, language } = req.query;
    const headlines = await utils.getSearchedHeadlines(text, language);
    const filteredNews = headlines.articles.filter(utils.filterArticle);
    return res.status(200).send(filteredNews);
  } catch (err) {
    return res.status(500).send('Server Error!');
  }
});

/**
 * Route to get raw html page for a particular article
 */
app.get('/fullarticle', async (req, res) => {
  try {
    const { url } = req.query;
    const body = await utils.getFullArticleContent(url);
    res.status(200).send(body);
  } catch (err) {
    return res.status(500).send('Server Error!');
  }
});

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});

module.exports = { app };
