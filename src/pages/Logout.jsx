import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { useToast } from '../hooks/useToast';

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { showToast } = useToast();

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully!', 'success');
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto mt-40 p-8 bg-white rounded-lg shadow-lg text-center">
      <h2 className="text-3xl font-bold mb-6">It's sad to see you go!</h2>
      <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
      <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
        Confirm Logout
      </button>
    </div>
  );
};

export default Logout;
