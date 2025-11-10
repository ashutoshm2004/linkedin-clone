import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Signup({ setUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const res = await api.post('/auth/register', { name, email, password });
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      navigate('/');
    } catch (error) {
      setErr(error.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="container">
      <div className="card" style={{maxWidth:480, margin:'24px auto'}}>
        <h2>Signup</h2>
        {err && <div style={{color:'red'}}>{err}</div>}
        <form onSubmit={submit}>
          <div className="form-group">
            <label>Name</label>
            <input required type="text" value={name} onChange={(e)=>setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input required type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input required type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>
          <div style={{display:'flex', gap:8}}>
            <button className="btn" type="submit">Signup</button>
          </div>
        </form>
      </div>
    </div>
  );
}
