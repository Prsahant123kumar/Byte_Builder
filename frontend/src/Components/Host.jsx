import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Host = () => {
  const navigate = useNavigate();
  const [Credential, setCredential] = useState({
    ID: '',
    Level: 0,
    Question: [{ question: '', answer: '' }],
    TimeStart: '',
    Duration: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Credential.ID || !Credential.Level || !Credential.Question || !Credential.TimeStart || !Credential.Duration) {
      alert('Please fill all the fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/host/CreateContest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Credential),
      });

      const result = await response.json();
      if (!result.success) {
        alert('Enter valid data or an error occurred');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing your request.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredential({ ...Credential, [name]: value });
  };

  const handleQuestionChange = (index, event) => {
    const updatedQuestions = [...Credential.Question];
    updatedQuestions[index][event.target.name] = event.target.value;
    setCredential({ ...Credential, Question: updatedQuestions });
  };

  const addQuestion = () => {
    setCredential({
      ...Credential,
      Question: [...Credential.Question, { question: '', answer: '' }],
    });
  };

  const removeQuestion = (index) => {
    const updatedQuestions = Credential.Question.filter((_, i) => i !== index);
    setCredential({ ...Credential, Question: updatedQuestions });
  };

  return (
    <div className="container mt-5">
  <div className="row justify-content-center">
    <div className="col-lg-18 col-md-18 col-sm-12">
      <div className="card">
        <div className="card-body">
          <h3 className="text-center mb-4">Host a Contest</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="ID" className="form-label">ID</label>
              <input
                type="text"
                className="form-control"
                id="ID"
                name="ID"
                value={Credential.ID}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Level" className="form-label">Level</label>
              <input
                type="number"
                className="form-control"
                id="Level"
                name="Level"
                value={Credential.Level}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="TimeStart" className="form-label">Time Start</label>
              <input
                type="datetime-local"
                className="form-control"
                id="TimeStart"
                name="TimeStart"
                value={Credential.TimeStart}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Duration" className="form-label">Duration (minutes)</label>
              <input
                type="number"
                className="form-control"
                id="Duration"
                name="Duration"
                value={Credential.Duration}
                onChange={handleChange}
                required
              />
            </div>

            <h5 className="mt-4">Questions</h5>
            {Credential.Question.map((q, index) => (
              <div key={index} className="mb-3">
                <label htmlFor={`question-${index}`} className="form-label">{`Question ${index + 1}`}</label>
                <textarea
                  className="form-control"
                  id={`question-${index}`}
                  name="question"
                  value={q.question}
                  onChange={(e) => handleQuestionChange(index, e)}
                  rows="3" // You can adjust this value for initial height
                  required
                ></textarea>
                <label htmlFor={`answer-${index}`} className="form-label">Answer</label>
                <input
                  type="text"
                  className="form-control"
                  id={`answer-${index}`}
                  name="answer"
                  value={q.answer}
                  onChange={(e) => handleQuestionChange(index, e)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-danger btn-sm mt-2"
                  onClick={() => removeQuestion(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-info mt-2"
              onClick={addQuestion}
            >
              Add Question
            </button>

            <button type="submit" className="btn btn-primary mt-4 w-100">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default Host;
