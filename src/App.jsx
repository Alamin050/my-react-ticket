import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom'; // Import useLocation
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DecorativeCircles from './components/DecorativeCircles';
import ConfirmationModal from './components/ConfirmationModal';

function App() {
  const [tickets, setTickets] = useState([
    { id: 1, title: 'Ticket 1', description: 'This is the first ticket', status: 'open', createdAt: '2025-10-20' },
    { id: 2, title: 'Ticket 2', description: 'This is the second ticket', status: 'in_progress', createdAt: '2025-10-21' },
    { id: 3, title: 'Ticket 3', description: 'This is the third ticket', status: 'open', createdAt: '2025-10-22' },
    { id: 4, title: 'Ticket 4', description: 'This is an in progress ticket', status: 'in_progress', createdAt: '2025-10-22' },
    { id: 5, title: 'Ticket 5', description: 'This is a closed ticket', createdAt: '2025-10-23' },
  ]);

  const [editingTicket, setEditingTicket] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const location = useLocation(); // Get current location
  const isLandingPage = location.pathname === '/';

  const showConfirmation = (options) => {
    return new Promise((resolve) => {
      setConfirmationModal({ ...options, resolve });
    });
  };

  const handleSubmit = (ticketData) => {
    if (editingTicket) {
      setTickets(tickets.map(t => t.id === editingTicket.id ? { ...ticketData, id: editingTicket.id, createdAt: editingTicket.createdAt } : t));
    } else {
      setTickets([...tickets, { ...ticketData, id: Date.now(), createdAt: new Date().toISOString().slice(0, 10) }]);
    }
    setEditingTicket(null);
  };

  const handleEdit = (ticket) => {
    setEditingTicket(ticket);
  };

  const handleDelete = (ticketId) => {
    setTickets(tickets.filter(t => t.id !== ticketId));
  };

  const handleToggleStatus = ({ id, status }) => {
    setTickets(tickets.map(t => t.id === id ? { ...t, status } : t));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="mx-auto w-full flex flex-col min-h-screen items-center">
        <Navbar />
        <main className={`flex-grow w-[100vw] max-w-[1440px] overflow-x-hidden ${isLandingPage ? 'pt-0' : 'pt-16'}`}>
          <Outlet context={{ tickets, handleSubmit, handleEdit, handleDelete, handleToggleStatus, showConfirmation }} />
        </main>
        <Footer />
        {confirmationModal && (
          <ConfirmationModal
            {...confirmationModal}
            onClose={() => setConfirmationModal(null)}
          />
        )}
      </div>
      <DecorativeCircles />
    </div>
  );
}

export default App;