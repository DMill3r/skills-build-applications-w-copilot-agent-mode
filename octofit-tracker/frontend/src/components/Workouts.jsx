import { useState, useEffect } from 'react';

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (codespaceName && codespaceName.trim().length > 0) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  return 'http://localhost:8000';
};

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    userId: '',
    name: '',
    description: '',
    type: 'cardio',
    difficulty: 'beginner',
  });

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${getApiBaseUrl()}/api/workouts`);
      if (!response.ok) throw new Error('Failed to fetch workouts');
      const data = await response.json();
      setWorkouts(data);
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
      const response = await fetch(`${getApiBaseUrl()}/api/workouts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to create workout');
      setFormData({
        userId: '',
        name: '',
        description: '',
        type: 'cardio',
        difficulty: 'beginner',
      });
      fetchWorkouts();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Workout Plans</h2>

      <div className="card mb-4">
        <div className="card-header">Create New Workout</div>
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
              <label className="form-label">Workout Name</label>
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
              <label className="form-label">Workout Type</label>
              <select
                className="form-control"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              >
                <option value="cardio">Cardio</option>
                <option value="strength">Strength</option>
                <option value="flexibility">Flexibility</option>
                <option value="mixed">Mixed</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Difficulty Level</label>
              <select
                className="form-control"
                value={formData.difficulty}
                onChange={(e) =>
                  setFormData({ ...formData, difficulty: e.target.value })
                }
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Create Workout
            </button>
          </form>
        </div>
      </div>

      {loading ? (
        <div className="alert alert-info">Loading workouts...</div>
      ) : (
        <div className="row">
          {workouts.map((workout) => (
            <div key={workout._id} className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{workout.name}</h5>
                  <p className="card-text">{workout.description}</p>
                  <div className="mb-2">
                    <span className="badge bg-info me-2">{workout.type}</span>
                    <span className="badge bg-secondary">{workout.difficulty}</span>
                  </div>
                  <p className="text-muted small">
                    User: {workout.userId}
                  </p>
                  <small>Created: {new Date(workout.createdAt).toLocaleDateString()}</small>
                </div>
              </div>
            </div>
          ))}
          {workouts.length === 0 && (
            <div className="alert alert-info">No workouts created yet</div>
          )}
        </div>
      )}
    </div>
  );
}
