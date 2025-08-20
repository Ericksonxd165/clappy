import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div>
      {/* You can add admin specific header, sidebar, etc. here */}
      <h1>Admin Section</h1>
      <Outlet /> {/* This will render the nested admin routes */}
    </div>
  );
};

export default AdminLayout;
