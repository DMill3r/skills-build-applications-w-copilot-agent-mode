import { useState, useEffect } from 'react';

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (codespaceName && codespaceName.trim().length > 0) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  return 'http://localhost:8000';
};

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    userId: '',
    type: 'running',
    duration: '',
    distance: '',
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${getApiBaseUrl()}/api/activities`);
      if (!response.ok) throw new Error('Failed to fetch activities');
      const data = await response.json();
      // Handle both array and paginated responses
      const activities = Array.isArray(data) ? data : (data.data || []);
      setActivities(activities);
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
      const response = await fetch(`${getApiBaseUrl()}/api/activities`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to create activity');
      setFormData({
        userId: '',
        type: 'running',
        duration: '',
        distance: '',
        date: new Date().toISOString().split('T')[0],
      });
      fetchActivities();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Activities</h2>

      <div className="card mb-4">
        <div className="card-header">Log New Activity</div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">User ID</label>
              <input
                type="text"
                className="form-control"
                value={formData.userId}
                onChange={(e) =>
                  setFormData({ ...formData, userId: e.target.value })
                }
                placeholder="User ID"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Activity Type</label>
              <select
                className="form-control"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              >
                <option value="running">Running</option>
                <option value="cycling">Cycling</option>
                <option value="swimming">Swimming</option>
                <option value="walking">Walking</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Duration (minutes)</label>
              <input
                type="number"
                className="form-control"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Distance (km)</label>
              <input
                type="number"
                className="form-control"
                step="0.1"
                value={formData.distance}
                onChange={(e) =>
                  setFormData({ ...formData, distance: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Log Activity
            </button>
          </form>
        </div>
      </div>

      {loading ? (
        <div className="alert alert-info">Loading activities...</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Type</th>
                <th>Duration (min)</th>
                <th>Distance (km)</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id}>
                  <td>{activity._id}</td>
                  <td>{activity.userId}</td>
                  <td>{activity.type}</td>
                  <td>{activity.duration}</td>
                  <td>{activity.distance}</td>
                  <td>{new Date(activity.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {activities.length === 0 && (
            <div className="alert alert-info">No activities logged</div>
          )}
        </div>
      )}
    </div>
  );
}
