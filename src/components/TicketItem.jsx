import React from 'react';
import { Link } from 'react-router-dom';

const TicketItem = ({ ticket, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center border border-gray-200">
      <div>
        <Link to={`/tickets/${ticket.id}`} className="text-xl font-semibold text-blue-600 hover:underline">{ticket.title}</Link>
        <p className="text-gray-700">{ticket.description}</p>
        <p className="text-gray-500 text-sm">Status: <span className={ticket.status === 'open' ? 'text-green-600' : ticket.status === 'in_progress' ? 'text-amber-600' : 'text-gray-600'}>{ticket.status}</span></p>
      </div>
      <div className="flex space-x-2">
        <button onClick={() => onEdit(ticket)} className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 px-3 rounded">
          Update
        </button>
        <button onClick={() => onDelete(ticket.id)} className="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-3 rounded">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TicketItem;
