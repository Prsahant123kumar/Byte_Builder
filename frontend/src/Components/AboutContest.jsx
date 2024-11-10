import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AboutContest = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Access question data from state
  const { question ,Duration,ID} = location.state || {}; 

  console.log('Received question:', question);

  const handleDisplay = () => {
    // Navigate with received question state (if needed)
    navigate('/display', { state: { question , Duration,ID} });
  };

  return (
    <div className="card">
      <div className="card-header">
        Description
      </div>
      <div className="card-body">
        <h5 className="card-title">Special title treatment</h5>
        <p className="card-text">
          With supporting text below as a natural lead-in to additional content.
        </p>
        <button onClick={handleDisplay} className="btn btn-primary">Start</button>
      </div>
    </div>
  );
};

export default AboutContest;
