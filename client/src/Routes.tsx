import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
// import Question from './components/Question';
// import Result from './components/Result';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          {/*<Route path="/fullarticle" component={Result} />*/}
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Routes;
