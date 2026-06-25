import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiBase = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${apiBase}/api/teams/`)
      .then((res) => res.json())
      .then((data) => setTeams(Array.isArray(data) ? data : data.results ?? []))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Teams</h2>
      <div className="row g-3">
        {teams.map((t) => (
          <div key={t._id} className="col-md-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{t.name}</h5>
                <p className="card-text">
                  <strong>Mascot:</strong> {t.mascot}<br />
                  <strong>Coach:</strong> {t.coach}<br />
                  <strong>Weekly Goal:</strong> {t.weeklyGoalMinutes} min
                </p>
                <ul className="list-group list-group-flush">
                  {(t.members ?? []).map((m) => (
                    <li key={m._id ?? m} className="list-group-item">
                      {m.displayName ?? m}
                    </li>
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
