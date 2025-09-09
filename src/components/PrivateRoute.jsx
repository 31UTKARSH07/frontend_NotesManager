import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authContext from '../context/authContext.jsx';

const PrivateRoute = () => {
  const { user, loading } = useContext(authContext);

  if (loading) {
    return <div>Loading session...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;