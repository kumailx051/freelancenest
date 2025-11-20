import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const isAuthPage = ['/login', '/signup'].includes(location.pathname);

  return (
    <>
      {!isAuthPage && <Header />}
      <main className={!isAuthPage ? "pt-16 lg:pt-20" : ""}>{children}</main>
      {!isAuthPage && <Footer />}
    </>
  );
};

export default AppLayout;








