import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../layouts/components/firebase";
import { login as authLogin, logout } from '../store/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading
  const dispatch = useDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(null);
    setLoading(true); // Start loading

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in successfully!");
      dispatch(authLogin());
      navigate('/user');
    } catch (err: any) {
      const errorMessage = err.code === 'auth/wrong-password' 
        ? "Incorrect email or password" 
        : err.message;
      setError(errorMessage);
      console.error("Login error:", err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh' 
    }}>
      <form 
        onSubmit={handleSubmit} 
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '300px'
        }}
      >
        <h2>Login</h2>
        {error && (
          <div style={{ 
            color: 'red', 
            backgroundColor: '#ffeeee', 
            padding: '10px',
            borderRadius: '4px'
          }}>
            {error}
          </div>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
        <button
          type="submit"
          disabled={loading} // Disable button while loading
          style={{
            padding: '10px',
            backgroundColor: loading ? '#6c757d' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {loading && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginTop: '10px' 
          }}>
            <div className="spinner" style={{
              width: '24px',
              height: '24px',
              border: '3px solid #f3f3f3',
              borderTop: '3px solid #007bff',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
          </div>
        )}
      </form>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Login;
