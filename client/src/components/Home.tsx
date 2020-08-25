import React, { Suspense } from 'react';
import Header from './Header';
import SearchBox from './SearchBox';
//lazily loads the news list for better user experience on slow network
const NewsList = React.lazy(() => import('./NewsList'));

/**
 * @function Home
 *
 * To be used as home page
 */
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
