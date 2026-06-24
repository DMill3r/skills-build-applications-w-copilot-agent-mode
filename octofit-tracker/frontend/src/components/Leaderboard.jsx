import { useState, useEffect } from 'react';

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (codespaceName && codespaceName.trim().length > 0) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  return 'http://localhost:8000';
};

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [type, setType] = useState('user');

  useEffect(() => {
    fetchLeaderboard();
  }, [type]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${getApiBaseUrl()}/api/leaderboard?type=${type}`);
      if (!response.ok) throw new Error('Failed to fetch leaderboard');
      const data = await response.json();
      // Handle both array and paginated responses
      const leaderboard = Array.isArray(data) ? data : (data.data || []);
      setLeaderboard(leaderboard);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Leaderboard</h2>

      <div className="mb-3">
        <div className="btn-group" role="group">
          <button
            type="button"
            className={`btn ${type === 'user' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setType('user')}
          >
            User Rankings
          </button>
          <button
            type="button"
            className={`btn ${type === 'team' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setType('team')}
          >
            Team Rankings
          </button>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="alert alert-info">Loading leaderboard...</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Points</th>
                <th>Activities</th>
                <th>Total Distance (km)</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry._id} className={index < 3 ? 'table-warning' : ''}>
                  <td>
                    <strong>#{index + 1}</strong>
                  </td>
                  <td>{entry.name || entry.userId}</td>
                  <td>
                    <strong>{entry.points || 0}</strong>
                  </td>
                  <td>{entry.activitiesCount || 0}</td>
                  <td>{(entry.totalDistance || 0).toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {leaderboard.length === 0 && (
            <div className="alert alert-info">No leaderboard data available</div>
          )}
        </div>
      )}
    </div>
  );
}
