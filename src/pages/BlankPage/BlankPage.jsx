import React, { lazy, Suspense } from 'react';
import './BlankPage.css';

// Lazy-load heavy sub-pages
const TheVoid = lazy(() => import('../TheVoid/TheVoid'));
import ClubRegPage from '../clubreg/ClubRegPage';
const ReactCloneApp = lazy(() => import('../../components/ReactCloneApp'));

const BlankPage = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="blank-wrapper">
      <Suspense fallback={null}>
        {!isMobile && <TheVoid />}
        <ClubRegPage />
        <ReactCloneApp />
      </Suspense>
    </div>
  );
};

export default BlankPage;
