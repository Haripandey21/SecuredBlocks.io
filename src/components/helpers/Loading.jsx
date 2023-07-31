import React from 'react';

const Loading = () => {
  return (
    <div className="loading-overlay">
          <div className="loader-container">
            <div className="loader">
              <div className="loader-text"></div>
              <div className="load"></div>
            </div>
          </div>
        </div>
  );
};

export default Loading;
