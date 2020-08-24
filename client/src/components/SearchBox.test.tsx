import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchBox from './SearchBox';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../reducers';

describe('SearchBox', () => {
  beforeEach(() => {
    render(
      <Provider store={createStore(reducers)}>
        <SearchBox />
      </Provider>
    );
  });

  it('should render search icon', () => {
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('should render search field', () => {
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('should render Go button', () => {
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Go')).toBeInTheDocument();
  });
});
