import React from 'react';
import NewsList from './NewsList';

interface HomeProps {}

interface HomeState {}

class Home extends React.PureComponent<HomeProps, HomeState> {
  public constructor(props: HomeProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <React.Fragment>
        <NewsList />
      </React.Fragment>
    );
  }
}

export default Home;
