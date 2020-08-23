import React, { Suspense } from 'react';
import Header from './Header';
import SearchBox from './SearchBox';
const NewsList = React.lazy(() => import('./NewsList'));

const Home: React.FC = () => {
  return (
    <div className="outerdiv">
      <Header />
      <SearchBox />
      <Suspense
        fallback={<div style={{ textAlign: 'center' }}>Loading...</div>}
      >
        <NewsList />
      </Suspense>
    </div>
  );
};

export default Home;
