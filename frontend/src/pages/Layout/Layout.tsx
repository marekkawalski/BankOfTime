import { Outlet } from 'react-router-dom';

import ServicesContextProvider from '../../context/ServicesContext';

const Layout = () => {
  return (
    <ServicesContextProvider>
      <Outlet />;
    </ServicesContextProvider>
  );
};

export default Layout;
