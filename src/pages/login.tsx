import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import {useDispatch} from "react-redux"
import { auth,db } from "../layouts/components/firebase";
import { login as authLogin , logout } from '../store/authSlice'


const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch()
  const handleSubmit = async (e : any) => {
    e.preventDefault();
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in successfully!");
      dispatch(authLogin())
      navigate('/user')
    } catch (err) {
      const errorMessage = err.code === 'auth/wrong-password' 
        ? "Incorrect email or password" 
        : err.message;
      setError(errorMessage);
      console.error("Login error:", error);
    }
    
    
  };
  useEffect(() => {
    dispatch(logout())
  },)
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
          style={{
            padding: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;