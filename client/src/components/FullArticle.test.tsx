import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import FullArticle from './FullArticle';
import promise from 'redux-promise';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

describe('FullArticle', () => {
  const mockResponse = {
    author: 'Cointelegraph By Felipe Erazo',
    title: 'Youtuber Explains How Crypto Scammers',
    url: 'https://cointelegraph.com/news',
    urlToImage: 'https://s3.cointelegraph.com/storage/cb62.jpg',
    publishedAt: '2020-08-23T13:28:00Z'
  };
  beforeEach(() => {
    window.scrollTo = jest.fn();
    render(
      <Provider
        store={createStoreWithMiddleware(
          combineReducers({
            fullArticle: () => {
              return mockResponse;
            }
          })
        )}
      >
        <FullArticle />
      </Provider>
    );
  });

  it('should render title', () => {
    expect(screen.getByText(mockResponse.title)).toBeInTheDocument();
  });

  it('should render author', () => {
    expect(screen.getByText(mockResponse.author)).toBeInTheDocument();
  });

  it('should render published date', () => {
    expect(screen.getByText(mockResponse.publishedAt)).toBeInTheDocument();
  });

  it('should render images', () => {
    expect(screen.getAllByRole('img').length).toEqual(2);
  });

  it('should render source url', () => {
    expect(screen.getByText(mockResponse.url)).toBeInTheDocument();
  });

  it('should render back button', () => {
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
