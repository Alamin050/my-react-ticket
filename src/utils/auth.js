export const isLoggedIn = () => {
  return localStorage.getItem('ticketapp_session') !== null;
};
