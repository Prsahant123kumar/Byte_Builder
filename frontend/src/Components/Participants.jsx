import React, { useState, useEffect } from 'react';
import Cards from './Cards';

const Participants = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
      const fetchQuestions = async () => {
          try {
              const response = await fetch('http://localhost:8000/Contest/Contest', {
                  method: 'GET',
                  headers: { 'Content-Type': 'application/json' },
              });

              if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
              }

              const data = await response.json();
              setQuestions(Array.isArray(data) ? data : [data]);
          } catch (err) {
              setError('An error occurred while fetching questions.');
          }
      };

      fetchQuestions();
  }, []);

  return (
      <div>
          {error && <p>{error}</p>}
          {questions.map((question, index) => (
              <Cards
                  key={index}
                  ID={question.ID}
                  Duration={question.Duration}
                  TimeStart={question.TimeStart}
                  Question={question.Question}
              />
          ))}
      </div>
  );
};
export default Participants;

