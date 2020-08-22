import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import FullArticle from './components/FullArticle';
// import Result from './components/Result';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/fullarticle" component={FullArticle} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Routes;
