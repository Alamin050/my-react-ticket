import React from 'react';
import { useOutletContext, useParams, useNavigate } from 'react-router-dom';

const TicketDetails = () => {
  const { tickets } = useOutletContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const ticket = tickets.find(t => t.id === parseInt(id));

  return (
    <div className="max-w-2xl mx-auto p-4 pt-20 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Ticket Details</h1>
      {ticket ? (
        <div>
          <h2 className="text-2xl font-semibold mb-2">{ticket.title}</h2>
          <p className="text-gray-700 mb-4">{ticket.description}</p>
          <p className="text-gray-600 text-sm">Status: <span className={ticket.status === 'open' ? 'text-green-600' : ticket.status === 'in_progress' ? 'text-amber-600' : 'text-gray-600'}>{ticket.status}</span></p>
          <p className="text-gray-600 text-sm">Created At: {ticket.createdAt}</p>
          <button onClick={() => navigate(-1)} className="mt-6 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
            Back to List
          </button>
        </div>
      ) : (
        <p className="text-red-500">Ticket not found.</p>
      )}
    </div>
  );
};

export default TicketDetails;
