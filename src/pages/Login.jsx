import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormValidation } from '../hooks/useFormValidation';
import { useToast } from '../hooks/useToast';
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { login } = useContext(AuthContext);

  const { errors, validate, validateField } = useFormValidation({
    email: { value: email, required: true, isEmail: true },
    password: { value: password, required: true },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        login(user);
        showToast('Logged in successfully!', 'success');
        navigate('/dashboard');
      } else {
        setAuthError('Invalid email or password');
        showToast('Invalid email or password', 'error');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleLogin}>
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={() => validateField('email')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          {errors.email && <p className="text-red-500 text-xs italic mt-2">{errors.email}</p>}
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} onBlur={() => validateField('password')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
          {errors.password && <p className="text-red-500 text-xs italic mt-2">{errors.password}</p>}
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
          Login
        </button>
        {authError && <p className="text-red-500 text-xs italic mt-4 text-center">{authError}</p>}
        <p className="text-center text-gray-600 text-sm mt-4">First time user? <Link to="/signup" className="text-blue-500 hover:text-blue-800">Sign up</Link></p>
      </form>
    </div>
  );
};

export default Login;
