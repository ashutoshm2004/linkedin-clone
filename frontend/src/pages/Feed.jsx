import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Feed({ user }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get('/posts');
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const toggleLike = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.post(`/posts/like/${id}`, {}, token);
      setPosts(prev => prev.map(p => p._id === id ? res.data : p));
    } catch (err) {
      console.error(err);
      alert('Like failed (login required)');
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this post?')) return;
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/posts/${id}`, token);
      setPosts(prev => prev.filter(p => p._id !== id));
    } catch (err) { console.error(err); alert('Delete failed'); }
  };

  const startEdit = (p) => {
    setEditId(p._id);
    setEditText(p.text);
  };

  const saveEdit = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.put(`/posts/${id}`, { text: editText }, token);
      setPosts(prev => prev.map(p => p._id === id ? res.data : p));
      setEditId(null); setEditText('');
    } catch (err) { console.error(err); alert('Edit failed'); }
  };

  if (loading) return <div className="container"><div className="card center">Loading...</div></div>;

  return (
    <div className="container">
      <div style={{display:'flex', gap:12, marginBottom:12}}>
        <div style={{flex:1}} className="card">
          <h3>Feed</h3>
          <div className="small">Latest posts from everyone</div>
        </div>
      </div>

      {posts.length === 0 && <div className="card center">No posts yet. Create one!</div>}

      {posts.map(post => (
        <div className="card" key={post._id}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
              <div style={{fontWeight:700}}>{post.userName}</div>
              <div className="post-meta">{new Date(post.createdAt).toLocaleString()}</div>
            </div>
            {user && (post.user === user._id || post.user === user.id) && (
              <div style={{display:'flex', gap:8}}>
                <button className="btn-ghost" onClick={()=>startEdit(post)}>Edit</button>
                <button className="btn-ghost" onClick={()=>remove(post._id)}>Delete</button>
              </div>
            )}
          </div>

          {editId === post._id ? (
            <><div className="form-group">
                <textarea rows="3" value={editText} onChange={(e)=>setEditText(e.target.value)} style={{width:'100%', marginTop:8}}></textarea>
              </div>
              <div style={{display:'flex', gap:8, marginTop:8}}>
                <button className="btn" onClick={()=>saveEdit(post._id)}>Save</button>
                <button className="btn-ghost" onClick={()=>{ setEditId(null); setEditText(''); }}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <div style={{marginTop:8}}>{post.text}</div>

              <div className="post-actions">
                <button className="btn-ghost" onClick={()=>toggleLike(post._id)} style={{ marginTop: '16px' }}>
                  {post.likes && post.likes.length > 0 ? `♥ ${post.likes.length}` : '♡ Like'}
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
