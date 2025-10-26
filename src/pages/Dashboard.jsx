import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

const Dashboard = () => {
  const { tickets } = useOutletContext();

  const totalTickets = tickets.length;
  const openTickets = tickets.filter(t => t.status === 'open').length;
  const inProgressTickets = tickets.filter(t => t.status === 'in_progress').length;
  const closedTickets = tickets.filter(t => t.status === 'closed').length;

  const overTimeChartData = {
    labels: [...new Set(tickets.map(ticket => ticket.createdAt))].sort(),
    datasets: [
      {
        label: 'Open Tickets',
        backgroundColor: '#22C55E',
        data: [...new Set(tickets.map(ticket => ticket.createdAt))].sort().map(date => tickets.filter(t => t.createdAt === date && t.status === 'open').length),
      },
      {
        label: 'In Progress Tickets',
        backgroundColor: '#F59E0B',
        data: [...new Set(tickets.map(ticket => ticket.createdAt))].sort().map(date => tickets.filter(t => t.createdAt === date && t.status === 'in_progress').length),
      },
    ],
  };

  const overTimeChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#4B5563',
        },
      },
      tooltip: {
        backgroundColor: '#333',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#666',
        borderWidth: 1,
        cornerRadius: 4,
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: {
          precision: 0,
          color: '#6B7280',
        },
        grid: {
          color: '#E5E7EB',
        },
      },
    },
  };

  const statusDistributionData = {
    labels: ['Open', 'In Progress', 'Closed'],
    datasets: [
      {
        backgroundColor: ['#22C55E', '#F59E0B', '#6B7280'],
        data: [openTickets, inProgressTickets, closedTickets],
      },
    ],
  };

  const statusDistributionOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#4B5563',
        },
      },
      tooltip: {
        backgroundColor: '#333',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#666',
        borderWidth: 1,
        cornerRadius: 4,
      },
    },
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <Link to="/logout" className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300">
          Logout
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Tickets</h2>
          <p className="text-4xl font-bold text-blue-600">{totalTickets}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Open Tickets</h2>
          <p className="text-4xl font-bold text-green-600">{openTickets}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">In Progress Tickets</h2>
          <p className="text-4xl font-bold text-amber-600">{inProgressTickets}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Closed Tickets</h2>
          <p className="text-4xl font-bold text-gray-600">{closedTickets}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tickets Status Over Time</h2>
          <div className="h-80">
            <Bar data={overTimeChartData} options={overTimeChartOptions} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ticket Status Distribution</h2>
          <div className="h-80">
            <Doughnut data={statusDistributionData} options={statusDistributionOptions} />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">All Tickets</h2>
        <ul className="divide-y divide-gray-200">
          {tickets.map(ticket => (
            <li key={ticket.id} className="py-4 flex justify-between items-center">
              <div>
                <Link to={`/tickets/${ticket.id}`} className="text-lg font-medium text-blue-600 hover:underline">{ticket.title}</Link>
                <p className="text-gray-500 text-sm">Status: <span className={ticket.status === 'open' ? 'text-green-600' : ticket.status === 'in_progress' ? 'text-amber-600' : 'text-gray-600'}>{ticket.status}</span></p>
              </div>
              <Link to={`/tickets/${ticket.id}`} className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 px-3 rounded shadow-md transition duration-300">View Details</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
