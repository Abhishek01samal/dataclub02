import React from 'react';
import Folder, { FolderFront } from '../../components/Folder/Folder';
import './FolderWrapper.css';

const FolderWrapper = ({ 
  isVisible = false, 
  isOpen = false, 
  color = '#5227FF', 
  paperColor = '#ffffff',
  size = 1.6,
  paper3Exiting = false,
  middlePageUp = false
}) => {
  return (
    <>
      <div className={`folder-back-wrapper ${isVisible ? 'visible' : ''}`}>
        <Folder color={color} paperColor={paperColor} size={size} isOpen={isOpen} paper3Exiting={paper3Exiting} middlePageUp={middlePageUp} />
      </div>
      
      <div className={`folder-front-wrapper ${isVisible ? 'visible' : ''}`}>
        <FolderFront color={color} size={size} isOpen={isOpen} />
      </div>
    </>
  );
};

export default FolderWrapper;
