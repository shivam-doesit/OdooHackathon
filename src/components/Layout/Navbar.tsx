import React, { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { 
  UserCircleIcon, 
  Cog6ToothIcon, 
  ArrowRightOnRectangleIcon,
  PlusIcon,
  HomeIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg border-b border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <SparklesIcon className="h-8 w-8 text-amber-600" />
              <span className="text-2xl font-bold text-gray-900">ReWear</span>
            </Link>
          </div>

          {user && (
            <div className="flex items-center space-x-4">
              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-6">
                <Link
                  to="/dashboard"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/dashboard')
                      ? 'text-amber-600 bg-amber-50'
                      : 'text-gray-700 hover:text-amber-600'
                  }`}
                >
                  <HomeIcon className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                
                <Link
                  to="/add-item"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/add-item')
                      ? 'text-amber-600 bg-amber-50'
                      : 'text-gray-700 hover:text-amber-600'
                  }`}
                >
                  <PlusIcon className="h-4 w-4" />
                  <span>Add Item</span>
                </Link>
              </div>

              {/* Points Display */}
              <div className="bg-amber-50 px-3 py-1 rounded-full">
                <span className="text-sm font-medium text-amber-800">
                  {user.points} points
                </span>
              </div>

              {/* User Menu */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="bg-white flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                    <span className="sr-only">Open user menu</span>
                    {user.avatar ? (
                      <img
                        className="h-8 w-8 rounded-full object-cover"
                        src={user.avatar}
                        alt={user.name}
                      />
                    ) : (
                      <UserCircleIcon className="h-8 w-8 text-gray-400" />
                    )}
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/dashboard"
                          className={`${
                            active ? 'bg-gray-50' : ''
                          } flex items-center px-4 py-2 text-sm text-gray-700`}
                        >
                          <UserCircleIcon className="h-4 w-4 mr-2" />
                          Profile
                        </Link>
                      )}
                    </Menu.Item>
                    
                    {user.role === 'admin' && (
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/admin"
                            className={`${
                              active ? 'bg-gray-50' : ''
                            } flex items-center px-4 py-2 text-sm text-gray-700`}
                          >
                            <Cog6ToothIcon className="h-4 w-4 mr-2" />
                            Admin Panel
                          </Link>
                        )}
                      </Menu.Item>
                    )}
                    
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={logout}
                          className={`${
                            active ? 'bg-gray-50' : ''
                          } flex items-center w-full text-left px-4 py-2 text-sm text-gray-700`}
                        >
                          <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;