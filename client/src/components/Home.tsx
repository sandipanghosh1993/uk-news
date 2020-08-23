import React, { Suspense } from 'react';
import SearchBox from './SearchBox';
const NewsList = React.lazy(() => import('./NewsList'));

const Home: React.FC = () => {
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
};

export default Home;
