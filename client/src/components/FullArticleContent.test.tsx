import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import FullArticleContent from './FullArticleContent';
import reducers from '../reducers';

describe('FullArticleContent', () => {
  describe('Without response data', () => {
    it('should render busy indicator', () => {
      render(
        <Provider store={createStore(reducers)}>
          <FullArticleContent />
        </Provider>
      );
      expect(screen.getAllByRole('status').length).toEqual(3);
    });
  });

  describe('With response data', () => {
    beforeEach(() => {
      render(
        <Provider
          store={createStore(
            combineReducers({
              fullArticleContent: () => {
                return { content: 'Fake content' };
              }
            })
          )}
        >
          <FullArticleContent />
        </Provider>
      );
    });

    it('should render correct content', () => {
      expect(screen.getByText('Fake content')).toBeInTheDocument();
    });
  });
});
