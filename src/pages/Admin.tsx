import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckIcon, 
  XMarkIcon, 
  EyeIcon,
  UserIcon,
  SparklesIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import Button from '../components/UI/Button';
import toast from 'react-hot-toast';

const Admin: React.FC = () => {
  const { user } = useAuth();
  const { items, updateItem } = useApp();
  const [activeTab, setActiveTab] = useState<'pending' | 'flagged' | 'analytics'>('pending');

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  const pendingItems = items.filter(item => item.status === 'pending');
  const flaggedItems = items.filter(item => Math.random() > 0.8); // Mock flagged items

  const handleApproveItem = (itemId: string) => {
    updateItem(itemId, { status: 'available' });
    toast.success('Item approved successfully!');
  };

  const handleRejectItem = (itemId: string) => {
    updateItem(itemId, { status: 'rejected' });
    toast.success('Item rejected and removed.');
  };

  const stats = [
    {
      label: 'Total Users',
      value: '1,234',
      icon: UserIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Active Items',
      value: items.filter(item => item.status === 'available').length,
      icon: SparklesIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Pending Review',
      value: pendingItems.length,
      icon: ExclamationTriangleIcon,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    },
    {
      label: 'Flagged Items',
      value: flaggedItems.length,
      icon: ExclamationTriangleIcon,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-purple-100">
            Manage the ReWear community and keep quality standards high
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.bgColor} mr-4`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('pending')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'pending'
                    ? 'border-purple-500 text-purple-600 bg-purple-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Pending Items ({pendingItems.length})
              </button>
              <button
                onClick={() => setActiveTab('flagged')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'flagged'
                    ? 'border-purple-500 text-purple-600 bg-purple-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Flagged Items ({flaggedItems.length})
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'analytics'
                    ? 'border-purple-500 text-purple-600 bg-purple-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Analytics
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'pending' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Items Pending Review</h2>
                
                {pendingItems.length === 0 ? (
                  <div className="text-center py-12">
                    <CheckIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
                    <p className="text-gray-600">No items are currently pending review.</p>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {pendingItems.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border border-gray-200 rounded-lg p-6"
                      >
                        <div className="flex items-start space-x-4">
                          <img
                            src={item.images[0]}
                            alt={item.title}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {item.title}
                            </h3>
                            <p className="text-gray-600 mb-2">{item.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                              <span>{item.category}</span>
                              <span>•</span>
                              <span>Size {item.size}</span>
                              <span>•</span>
                              <span>{item.points} points</span>
                              <span>•</span>
                              <span>by {item.ownerName}</span>
                            </div>
                            <div className="flex space-x-3">
                              <Button
                                onClick={() => handleApproveItem(item.id)}
                                size="sm"
                                className="flex items-center"
                              >
                                <CheckIcon className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                onClick={() => handleRejectItem(item.id)}
                                variant="secondary"
                                size="sm"
                                className="flex items-center"
                              >
                                <XMarkIcon className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center"
                              >
                                <EyeIcon className="h-4 w-4 mr-1" />
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'flagged' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Flagged Items</h2>
                <div className="text-center py-12">
                  <ExclamationTriangleIcon className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No flagged items</h3>
                  <p className="text-gray-600">Community reports will appear here for review.</p>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Platform Analytics</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-medium text-gray-900 mb-4">User Growth</h3>
                    <div className="text-3xl font-bold text-green-600 mb-2">+15%</div>
                    <p className="text-sm text-gray-600">New users this month</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-medium text-gray-900 mb-4">Swap Success Rate</h3>
                    <div className="text-3xl font-bold text-blue-600 mb-2">87%</div>
                    <p className="text-sm text-gray-600">Successful swaps completed</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-medium text-gray-900 mb-4">Average Item Value</h3>
                    <div className="text-3xl font-bold text-purple-600 mb-2">23 pts</div>
                    <p className="text-sm text-gray-600">Points per item</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-medium text-gray-900 mb-4">Daily Active Users</h3>
                    <div className="text-3xl font-bold text-amber-600 mb-2">456</div>
                    <p className="text-sm text-gray-600">Users active today</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;