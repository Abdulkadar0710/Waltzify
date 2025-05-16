import React from 'react';  
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const adminData = JSON.parse(localStorage.getItem('adminData'));

  // If no admin data or the role doesn't match any required roles, redirect to login
  if (!adminData || !requiredRole.includes(adminData.role)) {
    return <Navigate to="/AdminLogin" />;
  }

  // If the role matches, render the children components (allow access)
  return children;
};

export default ProtectedRoute;


/* import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const adminData = JSON.parse(localStorage.getItem('adminData'));

  // If no admin data or the role doesn't match, redirect to the login page
  if (!adminData || !requiredRole.includes(adminData.role)) {
    return <Navigate to="/AdminLogin" />;
  }
  if (requiredRole === 'Main Admin') {
   
    return <Navigate to="/NavAfterLog" />;
  }
  else if (requiredRole === 'Category Admin' ) {
    // Redirect if user is not Category admin
    return <Navigate to="/newcategory" />;
  }
  else if (requiredRole === 'Products Admin' ) {
    // Redirect if user is not Category admin
    return <Navigate to="/addproducts" />;
  }
  else if (requiredRole === 'Reviews & Rating Admin') {
    // Redirect if user is not Category admin
    return <Navigate to="/review" />;
  }
  else if (requiredRole === 'Handle User Admin' && adminData === 'admin_userlist@gmail.com') {
    // Redirect if user is not Category admin
    return <Navigate to="/userlist" />;
  }
  else if(requiredRole === 'Handle Order Admin')
  {
    return <Navigate to = "/orderlist"/>
  }
  
  // If the role matches, render the children components
  return children;
};

export default ProtectedRoute; */






