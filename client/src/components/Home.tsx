import React, { Suspense } from 'react';
import SearchBox from './SearchBox';
const NewsList = React.lazy(() => import('./NewsList'));

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
        <Suspense
          fallback={<div style={{ textAlign: 'center' }}>Loading...</div>}
        >
          <NewsList />
        </Suspense>
      </div>
    );
  }
}

export default Home;
