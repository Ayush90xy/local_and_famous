
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const logout = () => { localStorage.removeItem('token'); localStorage.removeItem('user'); navigate('/'); };

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">Local&Famous</Link>
      </div>
      <div className="flex-none gap-2">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/favorites">Favorites</Link></li>
          <li><Link to="/vendor">Vendor</Link></li>
          <li><Link to="/admin">Admin</Link></li>
          {token ? (
            <>
              <li><Link to="/profile">Profile</Link></li>
              <li><button className="btn btn-ghost" onClick={logout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
