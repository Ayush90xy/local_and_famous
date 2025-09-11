
import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import Map from '../components/Map';

export default function Home() {
  const [listings, setListings] = useState([]);
  const [coords, setCoords] = useState([12.9716, 77.5946]);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(pos => setCoords([pos.coords.latitude, pos.coords.longitude]));
    }
  }, []);

  useEffect(() => {
    api.get(`/listings/nearby?lat=${coords[0]}&lon=${coords[1]}&radius=5000`).then(r=>setListings(r.data)).catch(()=>{});
  }, [coords]);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Discover Near You</h1>
      <div className="card bg-base-100 shadow p-4">
        <Map center={coords} markers={listings.map(l=>({lat:l.geoPoint?.coordinates?.[1],lng:l.geoPoint?.coordinates?.[0],title:l.title,id:l._id}))} />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {listings.map(l=> (
          <a key={l._id} href={`/listing/${l._id}`} className="card bg-base-100 shadow p-4">
            <h3 className="text-lg font-semibold">{l.title}</h3>
            <p className="text-sm opacity-70">{l.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
