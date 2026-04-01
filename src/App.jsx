import React, { useState, useEffect, lazy, Suspense, useCallback } from 'react';
import LoadingAnimation from './animations/LoadingAnimation';
import RingSystem from './components/RingSystem';
const BlankPage = lazy(() => import('./pages/BlankPage/BlankPage'));
const TravelToAnimation = lazy(() => import('./animations/Travel_To/TravelToAnimation'));

function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isTraveling, setIsTraveling] = useState(false);
  const [showBlankPage, setShowBlankPage] = useState(false);

  useEffect(() => {
    if (!showBlankPage) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      // Force scroll to top when transition completes to ensure entry point is correct
      window.scrollTo(0, 0);
    }
  }, [showBlankPage]);

  // Memoized callbacks \u2014 prevent child re-renders from new function identity on every render
  const handleLoadComplete = useCallback(() => setHasEntered(true), []);
  const handleEnterClick = useCallback(() => setIsTraveling(true), []);
  const handleTravelComplete = useCallback(() => setShowBlankPage(true), []);

  return (
    <div className="page-shell">
      <Suspense fallback={null}>
        {!showBlankPage && (
          <>
            <LoadingAnimation onComplete={handleLoadComplete} />
            
            <RingSystem 
              isVisible={hasEntered && !isTraveling} 
              onEnterClick={handleEnterClick}
            />

            {isTraveling && (
              <TravelToAnimation
                isActive={isTraveling}
                onComplete={handleTravelComplete}
              >
                <RingSystem isVisible={hasEntered} />
              </TravelToAnimation>
            )}
          </>
        )}

        {showBlankPage && <BlankPage />}
      </Suspense>
    </div>
  );
}

export default App;
