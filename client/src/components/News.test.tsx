import React from 'react';
import { render, screen } from '@testing-library/react';
import News from './News';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../reducers';

describe('News', () => {
  beforeEach(() => {
    render(
      <Provider store={createStore(reducers)}>
        <News
          source={'BBC'}
          title={'News title'}
          description={'News description'}
          publishedAt={'01.01.2020'}
          urlToImage={''}
          url={''}
          author={'Author'}
        />
      </Provider>
    );
  });

  it('should render correct source', () => {
    expect(screen.getByText('BBC')).toBeInTheDocument();
  });

  it('should render correct title', () => {
    expect(screen.getByText('News title')).toBeInTheDocument();
  });

  it('should render correct description', () => {
    expect(screen.getByText('News description')).toBeInTheDocument();
  });

  it('should render correct published date', () => {
    expect(screen.getByText('01.01.2020')).toBeInTheDocument();
  });

  it('should render image', () => {
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
