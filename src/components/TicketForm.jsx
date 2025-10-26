import React, { useState, useEffect } from 'react';
import { useFormValidation } from '../hooks/useFormValidation';

const TicketForm = ({ ticket, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('open');

  const { errors, validate, validateField } = useFormValidation({
    title: { value: title, required: true },
    description: { value: description, required: false },
    status: { value: status, required: true },
  });

  useEffect(() => {
    if (ticket) {
      setTitle(ticket.title);
      setDescription(ticket.description);
      setStatus(ticket.status);
    } else {
      setTitle('');
      setDescription('');
      setStatus('open');
    }
  }, [ticket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ title, description, status });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4 mt-4">
      <div>
        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} onBlur={() => validateField('title')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        {errors.title && <p className="text-red-500 text-xs italic mt-2">{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} onBlur={() => validateField('description')} rows="4" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
        {errors.description && <p className="text-red-500 text-xs italic mt-2">{errors.description}</p>}
      </div>
      <div className="relative">
        <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">Status</label>
        <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} onBlur={() => validateField('status')} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-6">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
        {errors.status && <p className="text-red-500 text-xs italic mt-2">{errors.status}</p>}
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
        {ticket ? 'Update Ticket' : 'Create Ticket'}
      </button>
    </form>
  );
};

export default TicketForm;
