import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormValidation } from '../hooks/useFormValidation';
import { useToast } from '../hooks/useToast';
import { AuthContext } from '../contexts/AuthContext';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { login } = useContext(AuthContext);

  const { errors, validate, validateField } = useFormValidation({
    name: { value: name, required: true },
    email: { value: email, required: true, isEmail: true },
    password: { value: password, required: true },
  });

  const handleSignup = (e) => {
    e.preventDefault();
    if (validate()) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = users.some(u => u.email === email);

      if (userExists) {
        setAuthError('User with this email already exists. Redirecting to login...');
        showToast('User already exists. Redirecting to login...', 'warning');
        setTimeout(() => {
          navigate('/auth/login');
        }, 3000);
        return;
      }

      const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      login(newUser);
      showToast('Account created successfully!', 'success');
      navigate('/dashboard');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSignup}>
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} onBlur={() => validateField('name')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          {errors.name && <p className="text-red-500 text-xs italic mt-2">{errors.name}</p>}
        </div>
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
          Sign Up
        </button>
        {authError && <p className="text-red-500 text-xs italic mt-4 text-center">{authError}</p>}
      </form>
    </div>
  );
};

export default Signup;
