import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
  return (props) => {

    if (!localStorage.getItem("loggedin")) {
      return <Navigate to="/login" />;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;