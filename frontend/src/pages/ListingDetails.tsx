
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../lib/api';

export default function ListingDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!id) return;
    api.get(`/listings/${id}`).then(r=>setListing(r.data));
    api.get(`/reviews/for/${id}`).then(r=>setReviews(r.data));
  }, [id]);

  if (!listing) return <div className="loading loading-spinner"></div>;

  const addFavorite = async () => {
    await api.post(`/users/favorites/${listing._id}`);
    alert('Added to favorites');
  };

  return (
    <div className="space-y-4">
      <div className="card bg-base-100 shadow p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{listing.title}</h1>
          <button className="btn btn-outline" onClick={addFavorite}>♡ Favorite</button>
        </div>
        <p className="mt-2">{listing.description}</p>
        <div className="mt-2">⭐ {listing.ratingAvg?.toFixed(1) || 'No ratings yet'}</div>
      </div>
      <div className="card bg-base-100 shadow p-6">
        <h2 className="text-xl font-semibold mb-2">Reviews</h2>
        <ul className="space-y-2">
          {reviews.map(r=> (<li key={r._id} className="border-b pb-2">{r.rating}★ — {r.text}</li>))}
        </ul>
      </div>
    </div>
  );
}
