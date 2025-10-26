import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import TicketItem from '../components/TicketItem';
import TicketForm from '../components/TicketForm';
import { useToast } from '../hooks/useToast';

const TicketList = () => {
  const { tickets, handleSubmit, handleEdit, handleDelete, showConfirmation } = useOutletContext();
  const [showForm, setShowForm] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const { showToast } = useToast();

  const handleFormSubmit = (ticketData) => {
    handleSubmit(ticketData);
    setShowForm(false);
    showToast(editingTicket ? 'Ticket updated successfully!' : 'Ticket created successfully!', 'success');
    setEditingTicket(null);
  };

  const handleEditClick = (ticket) => {
    setEditingTicket(ticket);
    setShowForm(true);
    handleEdit(ticket);
  };

  const confirmDelete = async (ticketId) => {
    const result = await showConfirmation({
      title: 'Delete Ticket',
      message: 'Are you sure you want to delete this ticket? This action cannot be undone.',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    });

    if (result) {
      handleDelete(ticketId);
      showToast('Ticket deleted successfully!', 'success');
    } else {
      showToast('Ticket deletion cancelled.', 'info');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 pt-16">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Ticket List</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300 mt-4">
          {showForm ? 'Cancel' : 'Create New Ticket'}
        </button>
        {showForm && <TicketForm ticket={editingTicket} onSubmit={handleFormSubmit} />}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {tickets.map(ticket => (
          <TicketItem key={ticket.id} ticket={ticket} onEdit={handleEditClick} onDelete={confirmDelete} />
        ))}
      </div>
    </div>
  );
};

export default TicketList;
