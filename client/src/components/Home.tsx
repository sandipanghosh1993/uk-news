import React from 'react';
import NewsList from './NewsList';
import SearchBox from './SearchBox';

interface HomeProps {}

interface HomeState {}

class Home extends React.PureComponent<HomeProps, HomeState> {
  public constructor(props: HomeProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <div className="outerdiv">
        <h1 style={{ textAlign: 'center' }}>
          <strong>UK News</strong>
        </h1>
        <SearchBox />
        <NewsList />
      </div>
    );
  }
}

export default Home;
