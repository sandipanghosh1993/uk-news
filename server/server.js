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

const filterArticle = el => el.author && el.title && el.description;

app.get('/', async (req, res) => {
  const defaultPageSize = 30;
  const pageSize =
    req.query.pageSize > defaultPageSize ? req.query.pageSize : defaultPageSize;
  try {
    const headlines = await newsapi.v2.topHeadlines({
      pageSize: pageSize,
      language: req.query.language,
      country: req.query.country
    });
    const newList = headlines.articles.filter(filterArticle);
    return res.status(200).send(newList.slice(0, req.query.pageSize));
  } catch (err) {
    return res.status(500).send('Server Error!');
  }
});

app.get('/search', async (req, res) => {
  try {
    const headlines = await newsapi.v2.everything({
      q: req.query.text,
      language: req.query.language
    });
    const newList = headlines.articles.filter(filterArticle);
    return res.status(200).send(newList);
  } catch (err) {
    return res.status(500).send('Server Error!');
  }
});

// app.get('/news', async (req, res) => {
//   const trump = "https://gizmodo.com/man-with-sole-authority-to-launch-nuclear-weapons-retwe-1844516233"
//   const abc = 'https://news.google.com/__i/rss/rd/articles/CBMiK2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9TmJWd1FxS0JCTzjSAQA?oc=5'
//   const theguardian = 'https://www.skysports.com/boxing/news/12183/12050898/whyte-vs-povetkin-dillian-whyte-will-be-defeated-by-alexander-povetkin-says-michael-hunter';
//   try {
//       const {url} = req.query;
//       const doc = null;
//       const text = await fetch(trump);
//       const body = await text.text();
//       res.status(200).send(body);
//   } catch(err) {
//       console.error(err)
//       return res.status(500).send(err)
//   }
// });

// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them
/*newsapi.v2
  .topHeadlines({
    sources: 'bbc-news,the-verge',
    q: 'bitcoin',
    category: 'business',
    language: 'en',
    country: 'us'
  })
  .then(response => {
    console.log(response);

//  });
// To query /v2/everything
// You must include at least one q, source, or domain
/*newsapi.v2
  .everything({
    q: 'bitcoin',
    sources: 'bbc-news,the-verge',
    domains: 'bbc.co.uk, techcrunch.com',
    from: '2017-12-01',
    to: '2017-12-12',
    language: 'en',
    sortBy: 'relevancy',
    page: 2
  })
  .then(response => {
    console.log(response);

    {
      status: "ok",
      articles: [...]
    }

});*/
// To query sources
// All options are optional
/*newsapi.v2
  .sources({
    category: 'technology',
    language: 'en',
    country: 'us'
  })
  .then(response => {
    console.log(response);

  });*/

// // 085579c16f7a4c43b7ed23a199f8305e

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
