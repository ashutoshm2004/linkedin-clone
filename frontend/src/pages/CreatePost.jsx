import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function CreatePost({ user, onPostCreated }) {
  const [text, setText] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  if (!user) return (
    <div className="container">
      <div className="card center">Please <a href="/login">login</a> to create posts.</div>
    </div>
  );

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const token = localStorage.getItem('token');
      await api.post('/posts', { text }, token);
      setText('');
      onPostCreated?.();
      navigate('/');
    } catch (error) {
      setErr(error.response?.data?.msg || 'Failed to create post');
    }
  };

  return (
    <div className="container">
      <div className="card" style={{maxWidth:720, margin:'20px auto'}}>
        <h3>Create post</h3>
        {err && <div style={{color:'red'}}>{err}</div>}
        <form onSubmit={submit}>
          <div className="form-group">
            <textarea rows="4" placeholder="What's on your mind?" value={text} onChange={(e)=>setText(e.target.value)}></textarea>
          </div>
          <div style={{display:'flex', gap:8}}>
            <button className="btn" type="submit">Post</button>
          </div>
        </form>
      </div>
    </div>
  );
}
