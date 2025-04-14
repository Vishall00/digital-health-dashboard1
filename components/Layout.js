import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <main className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-16'} transition-all duration-300`}>
          <Dashboard />
        </main>
      </div>
    </div>
  );
};

export default Layout; 