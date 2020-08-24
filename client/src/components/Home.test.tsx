import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Home from './Home';
import reducers from '../reducers';
import promise from 'redux-promise';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

describe('Home', () => {
  beforeEach(() => {
    render(
      <Provider store={createStoreWithMiddleware(reducers)}>
        <Home />
      </Provider>
    );
  });

  it('should render loading text', () => {
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render header text', () => {
    expect(screen.getByText('UK News')).toBeInTheDocument();
  });

  it('should render search field', () => {
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });
});
