/**
 * Travel To Animation - Usage Example
 * 
 * This file demonstrates how to use the TravelToAnimation component
 * in your application.
 */

import React, { useState } from 'react';
import TravelToAnimation from './TravelToAnimation';

/**
 * Example Usage:
 * 
 * const [isTransitioning, setIsTransitioning] = useState(false);
 * 
 * const handleEnterClick = () => {
 *   setIsTransitioning(true);
 * };
 * 
 * <TravelToAnimation 
 *   isActive={isTransitioning}
 *   onComplete={() => {
 *     // Navigate to new section or show new content
 *     console.log('Transition complete!');
 *   }}
 * >
 *   <YourCurrentContent />
 * </TravelToAnimation>
 */

const TravelToAnimationExample = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleStartTransition = () => {
    setIsTransitioning(true);
  };

  const handleTransitionComplete = () => {
    console.log('Travel To animation complete!');
    // Add your navigation logic here
    // e.g., navigate to next page or show new section
  };

  return (
    <div>
      {/* Your rings or content to transition */}
      <div className="rings-container">
        {/* Rings content here */}
      </div>

      {/* Travel To Animation Wrapper */}
      <TravelToAnimation
        isActive={isTransitioning}
        onComplete={handleTransitionComplete}
      >
        {/* Content that will be sucked into void */}
        <div className="your-content">
          Content that will transition
        </div>
      </TravelToAnimation>

      {/* Trigger button */}
      <button onClick={handleStartTransition}>
        Travel To Next Section
      </button>
    </div>
  );
};

export default TravelToAnimationExample;
