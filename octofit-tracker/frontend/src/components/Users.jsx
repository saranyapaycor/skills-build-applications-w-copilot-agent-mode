import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiBase = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${apiBase}/api/users/`)
      .then((res) => res.json())
      .then((data) => setUsers(Array.isArray(data) ? data : data.results ?? []))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Users</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Grade</th>
            <th>Fitness Goal</th>
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.displayName}</td>
              <td>{u.username}</td>
              <td>{u.gradeLevel}</td>
              <td>{u.fitnessGoal}</td>
              <td>{u.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
