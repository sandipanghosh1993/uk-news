import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import NewsList from './NewsList';
import promise from 'redux-promise';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

describe('NewsList', () => {
  describe('Without response data', () => {
    it('should render No News Found text', () => {
      render(
        <Provider
          store={createStoreWithMiddleware(
            combineReducers({
              newsList: () => {
                return { data: [] };
              }
            })
          )}
        >
          <NewsList />
        </Provider>
      );
      expect(screen.getByText('No News Found')).toBeInTheDocument();
    });
  });

  describe('With response data', () => {
    const mockResponse = {
      data: [
        {
          source: {
            name: 'Cointelegraph'
          },
          author: 'Eren Sengezer',
          title: 'Cryptocurrency market update',
          description: 'Following an upbeat start to the week',
          url: 'https://www.fxstreet.com/cryptocurrencies',
          urlToImage: 'https://editorial.fxstreet.com/images/large.jpg',
          publishedAt: '2020-08-23T13:52:53Z',
          content:
            'Bitcoin is set to snap a four-week winning streak... [+1857 chars]'
        },
        {
          source: {
            name: 'BBC'
          },
          author: 'Cointelegraph By Felipe Erazo',
          title: 'Youtuber Explains How Crypto Scammers',
          description: 'It’s not your traditional malware scam.',
          url: 'https://cointelegraph.com/news',
          urlToImage: 'https://s3.cointelegraph.com/storage/cb62.jpg',
          publishedAt: '2020-08-23T13:28:00Z',
          content:
            'The modus operandi of crypto scammers differ... [+1309 chars]'
        }
      ]
    };
    beforeEach(() => {
      render(
        <Provider
          store={createStoreWithMiddleware(
            combineReducers({
              newsList: () => {
                return mockResponse;
              }
            })
          )}
        >
          <NewsList />
        </Provider>
      );
    });

    it('should render sources', () => {
      expect(
        screen.getByText(mockResponse.data[0].source.name)
      ).toBeInTheDocument();
      expect(
        screen.getByText(mockResponse.data[1].source.name)
      ).toBeInTheDocument();
    });

    it('should render titles', () => {
      expect(screen.getByText(mockResponse.data[0].title)).toBeInTheDocument();
      expect(screen.getByText(mockResponse.data[1].title)).toBeInTheDocument();
    });

    it('should render descriptions', () => {
      expect(
        screen.getByText(mockResponse.data[0].description)
      ).toBeInTheDocument();
      expect(
        screen.getByText(mockResponse.data[1].description)
      ).toBeInTheDocument();
    });

    it('should render published dates', () => {
      expect(
        screen.getByText(mockResponse.data[0].publishedAt)
      ).toBeInTheDocument();
      expect(
        screen.getByText(mockResponse.data[1].publishedAt)
      ).toBeInTheDocument();
    });

    it('should render images', () => {
      expect(screen.getAllByRole('img').length).toEqual(2);
    });
  });
});
