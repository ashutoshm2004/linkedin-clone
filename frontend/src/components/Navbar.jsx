import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="nav">
      <div className="brand">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke="#0a66c2" strokeWidth="1.5"/></svg>
        <div>MiniLinked</div>
      </div>

      <div style={{display:'flex', gap:12, alignItems:'center'}}>
        <Link to="/">Feed</Link>
        {user ? (
          <>
            <Link to="/create">Create</Link>
            <Link to="/profile">Profile</Link>
            <div className="small">Hi, {user.name}</div>
            <button className="btn" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="small">Login</Link>
            <Link to="/signup" className="btn">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
