const expect = require('chai').expect;
const sinon = require('sinon');
const request = require('supertest');
const utils = require('../utils');
const { app } = require('../server');
const validData = require('./data/validData');
const invalidData = require('./data/invalidData');
const mockData = { articles: [...validData, ...invalidData] };

describe('GET /', () => {
  let stubFn;
  before(() => {
    stubFn = sinon.stub(utils, 'getTopHeadlines');
  });

  it('should fetch Top Headlines', done => {
    stubFn.callsFake(() => {
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

  it('should handle serevr error', done => {
    stubFn.callsFake(() => {
      throw 'err';
    });

    request(app)
      .get('/')
      .expect(500)
      .end(done);
  });
});

describe('GET /search', () => {
  let stubFn;
  before(() => {
    stubFn = sinon.stub(utils, 'getSearchedHeadlines');
  });

  it('should fetch Searched Headlines', done => {
    stubFn.callsFake(() => {
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

  it('should handle serevr error', done => {
    stubFn.callsFake(() => {
      throw 'err';
    });

    request(app)
      .get('/search')
      .expect(500)
      .end(done);
  });
});

describe('GET /fullarticle', () => {
  let stubFn;
  before(() => {
    stubFn = sinon.stub(utils, 'getFullArticleContent');
  });

  it('should fetch Full Content', done => {
    const data = 'fake content';
    stubFn.callsFake(() => {
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

  it('should handle serevr error', done => {
    stubFn.callsFake(() => {
      throw 'err';
    });

    request(app)
      .get('/fullarticle')
      .expect(500)
      .end(done);
  });
});
