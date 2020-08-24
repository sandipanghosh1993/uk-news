import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import axios from 'axios';
import reducers from './reducers';
import Routes from './Routes';

describe('Routes', () => {
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
      }
    ]
  };
  beforeAll(() => {
    window.scrollTo = jest.fn();
    spyOn(axios, 'get').and.callFake(() => {
      return mockResponse;
    });
    const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
    render(
      <Provider store={createStoreWithMiddleware(reducers)}>
        <Routes />
      </Provider>
    );
  });

  it('should perform full page navigation', async () => {
    // Home page
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
    expect(
      screen.getByText(mockResponse.data[0].source.name)
    ).toBeInTheDocument();
    fireEvent.click(screen.getByText(mockResponse.data[0].source.name));
    //FullArticle page
    expect(screen.getByText(mockResponse.data[0].author)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button'));
    // Home page
    expect(
      screen.getByText(mockResponse.data[0].source.name)
    ).toBeInTheDocument();
  });
});
