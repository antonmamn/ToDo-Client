import { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; 

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    try {
      const response = await axios.post('http://localhost:8000/users/login', { email, password });
      const { userId, token } = response.data;      
   
      localStorage.setItem('userId', userId);
      localStorage.setItem('authToken', token);
     
      navigate('/kanban');
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message); 
      } else {
        setError('An error occurred. Please try again.'); 
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h1 className="text-center">Sign In</h1>
        {error && <div className="alert alert-danger">{error}</div>} {/* Display error messages */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-3">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
