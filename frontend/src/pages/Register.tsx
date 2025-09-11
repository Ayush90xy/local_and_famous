
import { useState } from 'react';
import { api } from '../lib/api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/auth/register', { name, email, password });
    window.location.href = '/login';
  };

  return (
    <form className="card bg-base-100 shadow p-6 max-w-md mx-auto space-y-2" onSubmit={submit}>
      <h1 className="text-xl font-bold">Register</h1>
      <input className="input input-bordered w-full" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
      <input className="input input-bordered w-full" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input type="password" className="input input-bordered w-full" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button className="btn btn-primary w-full" type="submit">Create account</button>
    </form>
  );
}
