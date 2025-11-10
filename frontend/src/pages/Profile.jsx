import React, { useState, useEffect } from 'react';
import api from '../api';

export default function Profile({ user }) {
  const [profileData, setProfileData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) {
        setError('Please login to view your profile.');
        setLoading(false);
        return;
      }

      try {
        setProfileData(user);

        const token = localStorage.getItem('token');
        const res = await api.get('/posts', token);

        const userPosts = res.data.filter(
          (p) => p.user === user._id || p.user === user.id
        );

        setPosts(userPosts.reverse());
      } catch (err) {
        console.error(err);
        setError('Failed to load profile data.');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  const remove = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/posts/${id}`, token);
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  const startEdit = (p) => {
    setEditId(p._id);
    setEditText(p.text);
  };

  const saveEdit = async (id) => {
    if (!editText.trim()) return;
    try {
      const token = localStorage.getItem('token');
      const res = await api.put(`/posts/${id}`, { text: editText }, token);
      setPosts((prev) => prev.map((p) => (p._id === id ? res.data : p)));
      setEditId(null);
      setEditText('');
    } catch (err) {
      console.error(err);
      alert('Edit failed');
    }
  };

  if (loading)
    return (
      <div className="container">
        <div className="card center">Loading Profile...</div>
      </div>
    );

  if (error)
    return (
      <div className="container">
        <div className="card center">{error}</div>
      </div>
    );

  return (
    <div className="container">
      <div className="profile-card">
        <h2>👤 {profileData.name}</h2>
        <p>
          <strong>Email:</strong> {profileData.email}
        </p>
      </div>

      <div className="card" style={{ marginTop: '20px' }}>
        <h3 style={{ marginBottom: '12px' }}>Your Posts</h3>
        {posts.length === 0 ? (
          <p className="small">You haven't posted anything yet.</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="post">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div className="post-author">{profileData.name}</div>
                  <div className="post-date">
                    {new Date(post.createdAt).toLocaleString()}
                  </div>
                </div>

                {user && (post.user === user._id || post.user === user.id) && (
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn-ghost" onClick={() => startEdit(post)}>Edit</button>
                    <button className="btn-ghost" onClick={() => remove(post._id)}>Delete</button>
                  </div>
                )}
              </div>

              {editId === post._id ? (
                <>
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    rows="3"
                    style={{
                      width: '100%',
                      resize: 'vertical',
                      marginBottom: '8px',
                    }}
                  />
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => saveEdit(post._id)}>Save</button>
                    <button onClick={() => setEditId(null)}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="post-text">{post.text}</div>
                  <div style={{ marginTop: '16px' }}>
                    <button style={{pointerEvents:'none'}}>{post.likes?.length || 0} Likes</button>               
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
