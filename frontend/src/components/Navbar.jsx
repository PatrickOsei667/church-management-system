import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (!isAuthenticated) return null;

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Church MS
        </Link>
        <div className="flex gap-6">
          <Link to="/dashboard" className="hover:text-blue-200">Dashboard</Link>
          <Link to="/members" className="hover:text-blue-200">Members</Link>
          <Link to="/donations" className="hover:text-blue-200">Donations</Link>
          <Link to="/branches" className="hover:text-blue-200">Branches</Link>
          {user?.role === 'admin' && (
            <>
              <Link to="/pastors" className="hover:text-blue-200">Pastors</Link>
              <Link to="/departments" className="hover:text-blue-200">Departments</Link>
            </>
          )}
        </div>
        <div className="flex gap-4 items-center">
          <span className="text-sm">{user?.member_name}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
