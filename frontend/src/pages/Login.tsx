
import { useState } from 'react';
import { api } from '../lib/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    window.location.href = '/';
  };

  return (
    <form className="card bg-base-100 shadow p-6 max-w-md mx-auto space-y-2" onSubmit={submit}>
      <h1 className="text-xl font-bold">Login</h1>
      <input className="input input-bordered w-full" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input type="password" className="input input-bordered w-full" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button className="btn btn-primary w-full" type="submit">Login</button>
    </form>
  );
}
