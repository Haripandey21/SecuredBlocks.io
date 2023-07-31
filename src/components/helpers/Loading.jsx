import React from 'react';

const Loading = () => {
  return (
    <div className="loading-overlay">
      <div className="loader-container">
        <div className="loader">
          <span className="loader-text">Processing</span>
          <span className="load"></span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
