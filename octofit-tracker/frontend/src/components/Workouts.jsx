import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
      : 'http://localhost:8000/api/workouts/';
    fetch(url)
      .then((res) => res.json())
      .then((data) => setWorkouts(Array.isArray(data) ? data : data.results ?? []))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Workouts</h2>
      <div className="row g-3">
        {workouts.map((w) => (
          <div key={w._id} className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{w.name}</h5>
                <span className={`badge bg-${w.difficulty === 'beginner' ? 'success' : w.difficulty === 'intermediate' ? 'warning' : 'danger'} mb-2`}>
                  {w.difficulty}
                </span>
                <p className="card-text">
                  <strong>Focus:</strong> {w.focusArea}<br />
                  <strong>Duration:</strong> {w.durationMinutes} min<br />
                  <strong>Goal:</strong> {w.suggestedForGoal}
                </p>
                <ul className="list-group list-group-flush">
                  {(w.exercises ?? []).map((ex, i) => (
                    <li key={i} className="list-group-item">{ex}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
