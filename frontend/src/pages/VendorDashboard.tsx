
import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function VendorDashboard() {
  const [vendor, setVendor] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categorySlug, setCategorySlug] = useState('food');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [cats, setCats] = useState([]);
  const [mine, setMine] = useState([]);

  useEffect(()=>{
    api.get('/vendors/me').then(r=>setVendor(r.data));
    api.get('/categories').then(r=>setCats(r.data));
    api.get('/listings/mine/vendor').then(r=>setMine(r.data));
  },[]);

  const becomeVendor = async ()=>{
    const phone = prompt('Enter phone');
    const res = await api.post('/vendors', { phone });
    setVendor(res.data);
  };

  const createListing = async (e)=>{
    e.preventDefault();
    const res = await api.post('/listings', { title, description, categorySlug, geoPoint: { lat: Number(lat), lon: Number(lon) } });
    alert('Created listing: '+res.data._id);
    const refresh = await api.get('/listings/mine/vendor');
    setMine(refresh.data);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">Vendor Dashboard</h1>
        {!vendor && <button className="btn btn-primary" onClick={becomeVendor}>Become Vendor</button>}
        {vendor && <span className="badge">{vendor.verified ? 'Verified' : 'Pending verification'}</span>}
      </div>

      <form className="card bg-base-100 shadow p-6 grid md:grid-cols-2 gap-3" onSubmit={createListing}>
        <input className="input input-bordered" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
        <select className="select select-bordered" value={categorySlug} onChange={e=>setCategorySlug(e.target.value)}>
          {cats.map(c=> <option key={c._id} value={c.slug}>{c.name}</option>)}
        </select>
        <textarea className="textarea textarea-bordered md:col-span-2" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
        <input className="input input-bordered" placeholder="Latitude" value={lat} onChange={e=>setLat(e.target.value)} />
        <input className="input input-bordered" placeholder="Longitude" value={lon} onChange={e=>setLon(e.target.value)} />
        <button className="btn btn-secondary md:col-span-2" type="submit">Create Listing</button>
      </form>

      <div className="grid md:grid-cols-2 gap-4">
        {mine.map(l=> (
          <div key={l._id} className="card bg-base-100 shadow p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{l.title}</h3>
              <span className="badge">{l.status}</span>
            </div>
            <p className="text-sm opacity-70">{l.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
