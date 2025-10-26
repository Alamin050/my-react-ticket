import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  const location = useLocation();

  const showNavbar = location.pathname !== '/auth/login' && location.pathname !== '/signup';

  if (!showNavbar) {
    return null;
  }

  return (
    <nav className="bg-[#155DFC] p-4 fixed w-[100vw] top-0 z-30 shadow-lg">
      <div className="container mx-auto flex items-center justify-between flex-wrap">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link to="/" className="font-semibold text-xl tracking-tight">TicketApp</Link>
        </div>
        <div className="block lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-gray-200 hover:border-gray-200">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>
        <div className={`${isOpen ? 'block' : 'hidden'} w-full flex-grow lg:flex lg:items-center lg:w-auto`}>
          <div className="text-sm lg:flex-grow lg:flex lg:justify-center lg:space-x-6 mt-4 lg:mt-0">
            <Link to="/" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 mr-4">Home</Link>
            <Link to="/tickets" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 mr-4">Tickets</Link>
            <Link to="/dashboard" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200">Dashboard</Link>
          </div>
          <div className="mt-4 lg:mt-0">
            {isLoggedIn && (
              <Link to="/logout" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0">Logout</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
