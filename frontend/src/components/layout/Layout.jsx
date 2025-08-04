import { Outlet, useLocation } from 'react-router-dom';
import Header from '../head/Header';
import Sidebar from '../Sidebar/Sidebar';
import './Layout.css';

const Layout = () => {
  const location = useLocation();

  return (
    <div className="layout">
      <Sidebar currentPath={location.pathname} />
      <div className="layout__main">
        <Header />
        <main className="layout__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;