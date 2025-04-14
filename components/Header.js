import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-800">Health Dashboard</span>
            </Link>
          </div>

          {/* Primary Navigation */}
          <nav className="flex items-center space-x-8">
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
              Dashboard
            </Link>
            <Link href="/insights" className="text-gray-600 hover:text-gray-900">
              Insights
            </Link>
            <Link href="/analytics" className="text-gray-600 hover:text-gray-900">
              Analytics
            </Link>
            <Link href="/reports" className="text-gray-600 hover:text-gray-900">
              Reports
            </Link>
            <Link href="/settings" className="text-gray-600 hover:text-gray-900">
              Settings
            </Link>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2 text-gray-600 hover:text-gray-900"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10">
                  <div className="px-4 py-2 text-sm text-gray-700">No new notifications</div>
                </div>
              )}
            </button>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-600">U</span>
                </div>
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </Link>
                  <Link href="/account-settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Account Settings
                  </Link>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 