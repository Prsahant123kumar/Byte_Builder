import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const DisplayQuestion = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { question, Duration ,ID} = location.state || {}; // Get data from state

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [answerCorrect, setAnswerCorrect] = useState(true);
  const [timer, setTimer] = useState(Duration * 60); // Duration in minutes, converted to seconds
  const [timerRunning, setTimerRunning] = useState(false);
  const [count, setCount] = useState(0); // Track the score
  const [inputValue, setInputValue] = useState('');

  const questions = question || [];

  // Start the timer as soon as the page is loaded
  useEffect(() => {
    if (!Duration) return; // If no duration is provided, do not run timer logic
    
    setTimerRunning(true); // Start the timer as soon as the page is loaded
    
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(prevTimer => prevTimer - 1);
      } else {
        clearInterval(interval); // Stop the timer when it reaches 0
        navigate('/leaderboard'); // Navigate to leaderboard when time's up
      }
    }, 1000); // Update timer every second
    
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [Duration, timer, navigate]);

  const submit = async () => {
    if (!answerCorrect) {
      alert('Give Correct Answer');
    } else {
      setCount(count + 1); // Increase score for correct answers
      alert('Your answers have been submitted.');
      const userData = JSON.parse(localStorage.getItem('user'))?.name; // Get user name from localStorage (handle null case)
    
    if (!userData) {
      alert('User data is missing.');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:8000/Contest/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userData,
          score: count, // Assuming 'count' is the score
          completionTime: timer, // Pass the remaining time as completionTime (in seconds)
         // Include user ID or some identifier if needed
         ID:ID
        }),
      });

      const result = await response.json();
      if (result.success) {
        navigate('/SeeLeaderBoard'); // Navigate to home or any other page after success
      } else {
        alert('Enter valid data or an error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing your request.');
    }
    }
    
  };

  const handleAnswerSubmit = (answer) => {
    setInputValue(answer);
    if (answer === questions[currentQuestionIndex].answer) {
      setAnswerCorrect(true);
      setUserAnswers(prev => ({
        ...prev,
        [currentQuestionIndex]: answer,
      }));
    } else {
      setAnswerCorrect(false);
    }
  };

  const goToNextQuestion = () => {
    if (answerCorrect && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswerCorrect(true); // Reset answer correctness for next question
      setCount(count + 1); // Increase score
      setInputValue('');
    } else {
      alert('Give Correct Answer');
    }
  };


  const currentQuestion = questions[currentQuestionIndex];
  const minutes = Math.floor(timer);
  const seconds = timer % 60;

  return (
    <div>
      {/* Timer shown in the top-right corner */}
      {timerRunning && (
        <div className="timer" style={{ position: 'fixed', top: '10px', right: '10px' }}>
          Time left: {minutes}:{seconds < 10 ? '0' : ''}{seconds}
        </div>
      )}

      <div className="question-card">
        <h2>Question {currentQuestionIndex + 1}</h2>
        <p>{currentQuestion.question}</p>

        {/* Input for the user to type their answer */}
        <input
          type="text"
          placeholder="Your answer"
          value={inputValue}
          onChange={(e) => handleAnswerSubmit(e.target.value)}
        />

        {/* Show if answer is incorrect */}
        <div>
          {currentQuestionIndex === questions.length - 1 ? (
            <button onClick={submit}>Submit</button> // Submit if it's the last question
          ) : (
            <button 
              onClick={goToNextQuestion} 
              disabled={!answerCorrect}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayQuestion;
