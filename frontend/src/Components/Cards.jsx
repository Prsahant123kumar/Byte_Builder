import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cards = (props) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    const question = props.Question;
    const Duration=props.Duration;
    const ID=props.ID;
    console.log('Navigating with question:', question);

    // Navigate to '/Start' with question data in state
    navigate('/Start', { state: { question ,Duration,ID} });
  };

  const formatDate = (date) => {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    return new Intl.DateTimeFormat('en-GB', options).format(new Date(date));
  };

  return (
    <div className="card shadow-lg mb-4" style={{ width: '500px', borderRadius: '15px' }}>
      <h5 className="card-header text-center bg-primary text-white">{props.ID}</h5>
      <div className="card-body">
        <p className="card-text text-center">Starts at: {formatDate(props.TimeStart)}</p>
        <h5 className="card-title text-center text-success">Duration: {props.Duration} minutes</h5>
        <button onClick={handleNavigate} className="btn btn-primary d-block mx-auto mt-3">Register</button>
      </div>
    </div>
  );
};

export default Cards;
