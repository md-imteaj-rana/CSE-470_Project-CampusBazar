import React, { useContext, useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import UseAxios from '../hooks/UseAxios';

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [userRole, setUserRole] = React.useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const axiosInstance = UseAxios();
  const location = useLocation();

  React.useEffect(() => {
    if (user?.email) {
      axiosInstance.get(`/users/role/${user.email}`)
        .then(res => setUserRole(res.data?.role))
        .catch(() => setUserRole(null));
    } else {
      setUserRole(null);
    }
  }, [axiosInstance, user]);

  const isAdmin = userRole === 'admin';

  const menuItems = [
    { name: 'My Profile', path: '/dashboard/MyProfile', icon: '👤' },
    { name: 'Add Listing', path: '/dashboard/AddListing', icon: '➕' },
    { name: 'My Listing', path: '/dashboard/MyListing', icon: '📦' },
    { name: 'My Wishlist', path: '/dashboard/MyWishlist', icon: '❤️' },
    { name: 'My Cart', path: '/dashboard/MyCart', icon: '🛒' },
    { name: 'My Orders', path: '/dashboard/MyOrders', icon: '📋' }
  ];

  if (isAdmin) {
    menuItems.push({ name: 'All Users', path: '/dashboard/AllUsers', icon: '👥' });
    menuItems.push({ name: 'All Orders', path: '/dashboard/AllOrders', icon: '📋' });
  }

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-lg">C</span>
            Dashboard
          </h2>
          <p className="text-sm text-gray-500 mt-1">Manage your account</p>
        </div>

        <nav className="px-4 py-2 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname.includes(item.path);
            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200 ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-700 font-semibold' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Mobile Header */}
        <div className="lg:hidden bg-white shadow-sm px-4 py-4 flex items-center gap-4 sticky top-0 z-30">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="font-semibold text-gray-800">User Dashboard</span>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;
