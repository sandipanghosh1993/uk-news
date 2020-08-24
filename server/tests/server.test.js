const expect = require('chai').expect;
const sinon = require('sinon');
const request = require('supertest');
const utils = require('../utils');
const { app } = require('../server');
const validData = require('./data/validData');
const invalidData = require('./data/invalidData');
const mockData = { articles: [...validData, ...invalidData] };

describe('GET /', () => {
  it('should fetch Top Headlines', done => {
    sinon.stub(utils, 'getTopHeadlines').callsFake(() => {
      return mockData;
    });

    request(app)
      .get('/')
      .query({ pageSize: 2, language: 'en', country: 'gb' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.length).to.equal(validData.length);
        done();
      });
  });
});

describe('GET /search', () => {
  it('should fetch Searched Headlines', done => {
    sinon.stub(utils, 'getSearchedHeadlines').callsFake(() => {
      return mockData;
    });

    request(app)
      .get('/search')
      .query({ text: 'bitcoin', language: 'en' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.length).to.equal(validData.length);
        done();
      });
  });
});

describe('GET /fullarticle', () => {
  it('should fetch Full Content', done => {
    const data = 'fake content';
    sinon.stub(utils, 'getFullArticleContent').callsFake(() => {
      return data;
    });

    request(app)
      .get('/fullarticle')
      .query({ url: 'https://fakeurl' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.equal(data);
        done();
      });
  });
});
