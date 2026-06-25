import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
      : 'http://localhost:8000/api/leaderboard/';
    fetch(url)
      .then((res) => res.json())
      .then((data) => setEntries(Array.isArray(data) ? data : data.results ?? []))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Leaderboard</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Student</th>
            <th>Team</th>
            <th>Points</th>
            <th>Active Minutes</th>
            <th>Period</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e) => (
            <tr key={e._id}>
              <td>{e.rank}</td>
              <td>{e.user?.displayName ?? e.user}</td>
              <td>{e.team?.name ?? e.team}</td>
              <td>{e.points}</td>
              <td>{e.activeMinutes}</td>
              <td>{e.period}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
