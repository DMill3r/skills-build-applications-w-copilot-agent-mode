import { useState, useEffect } from 'react';

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (codespaceName && codespaceName.trim().length > 0) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  return 'http://localhost:8000';
};

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    captain: '',
  });

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${getApiBaseUrl()}/api/teams`);
      if (!response.ok) throw new Error('Failed to fetch teams');
      const data = await response.json();
      // Handle both array and paginated responses
      const teams = Array.isArray(data) ? data : (data.data || []);
      setTeams(teams);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${getApiBaseUrl()}/api/teams`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to create team');
      setFormData({ name: '', description: '', captain: '' });
      fetchTeams();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Teams</h2>

      <div className="card mb-4">
        <div className="card-header">Create New Team</div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Team Name</label>
              <input
                type="text"
                className="form-control"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows="3"
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Captain ID</label>
              <input
                type="text"
                className="form-control"
                value={formData.captain}
                onChange={(e) =>
                  setFormData({ ...formData, captain: e.target.value })
                }
                placeholder="User ID of team captain"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Create Team
            </button>
          </form>
        </div>
      </div>

      {loading ? (
        <div className="alert alert-info">Loading teams...</div>
      ) : (
        <div className="row">
          {teams.map((team) => (
            <div key={team._id} className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text">{team.description}</p>
                  <p className="text-muted small">
                    Captain: {team.captain} | Members: {team.members?.length || 0}
                  </p>
                  <small>Created: {new Date(team.createdAt).toLocaleDateString()}</small>
                </div>
              </div>
            </div>
          ))}
          {teams.length === 0 && (
            <div className="alert alert-info">No teams found</div>
          )}
        </div>
      )}
    </div>
  );
}
