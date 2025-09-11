
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function Map({ center, markers }) {
  return (
    <MapContainer center={center} zoom={13} style={{ height: '420px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {markers.map(m => (
        <Marker key={m.id} position={[m.lat, m.lng]}>
          <Popup><a href={`/listing/${m.id}`}>{m.title}</a></Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
