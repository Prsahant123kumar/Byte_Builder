import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the leaderboard data when the component mounts
    const fetchLeaderboard = async () => {
        try {
          const response = await fetch('http://localhost:8000/Contest/final-leaderboard', {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' },
          });
          const data = await response.json(); // Make sure to parse the response
          console.log(data); // Check the structure of the response here
          setLeaderboard(data); // Ensure that `data` is an array
        } catch (err) {
          setError('Error fetching leaderboard');
        } finally {
          setLoading(false);
        }
      };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return <div>Loading leaderboard...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
            <th>Completion Time</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((participant, index) => (
            <tr key={index}>
              <td>{participant.name}</td>
              <td>{participant.score}</td>
              <td>{participant.completionTime} mins</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
