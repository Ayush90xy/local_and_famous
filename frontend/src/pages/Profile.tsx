
import { useEffect, useState } from 'react';
import { api } from '../lib/api';
export default function Profile() {
  const [me, setMe] = useState(null);
  useEffect(()=>{ api.get('/users/me').then(r=>setMe(r.data)); }, []);
  if (!me) return <div className="loading loading-spinner"></div>;
  return (
    <div className="card bg-base-100 shadow p-6">
      <h1 className="text-2xl font-bold">Profile</h1>
      <div className="mt-2">Name: {me.name}</div>
      <div>Email: {me.email}</div>
      <div>Role: {me.role}</div>
    </div>
  );
}
