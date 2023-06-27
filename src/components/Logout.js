import React from 'react';

const Logout = () => {
  const handleLogout = () => {
    // Clear the token from localStorage or secure cookie
    localStorage.removeItem('token');

    // Redirect to the login page or any other desired page
    window.location.href = '/';
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
