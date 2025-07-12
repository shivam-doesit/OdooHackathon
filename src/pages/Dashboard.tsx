import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  PlusIcon, 
  HeartIcon, 
  UserCircleIcon,
  CurrencyDollarIcon,
  ClockIcon,
  StarIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import Button from '../components/UI/Button';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { items, swaps } = useApp();

  if (!user) {
    return null;
  }

  const userItems = items.filter(item => item.ownerId === user.id);
  const userSwaps = swaps.filter(swap => swap.requesterId === user.id || swap.receiverId === user.id);
  const recentActivity = [
    { type: 'swap', message: 'Received swap request for Vintage Denim Jacket', time: '2 hours ago' },
    { type: 'earn', message: 'Earned 25 points for listing new item', time: '1 day ago' },
    { type: 'complete', message: 'Completed swap with Sarah Chen', time: '3 days ago' },
  ];

  const stats = [
    {
      label: 'Total Points',
      value: user.points,
      icon: CurrencyDollarIcon,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    },
    {
      label: 'Items Listed',
      value: userItems.length,
      icon: HeartIcon,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    },
    {
      label: 'Active Swaps',
      value: userSwaps.filter(swap => swap.status === 'pending').length,
      icon: ClockIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Completed Swaps',
      value: userSwaps.filter(swap => swap.status === 'completed').length,
      icon: StarIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-8 text-white mb-8"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}! 👋</h1>
              <p className="text-amber-100 text-lg">
                Ready to discover amazing fashion pieces today?
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-full border-2 border-white object-cover"
                />
              ) : (
                <UserCircleIcon className="w-16 h-16 text-white" />
              )}
              <div className="text-right">
                <div className="text-2xl font-bold">{user.points}</div>
                <div className="text-amber-200 text-sm">Points Available</div>
              </div>
            </div>
          </div>
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link to="/add-item">
                  <Button className="w-full justify-start" variant="outline">
                    <PlusIcon className="h-5 w-5 mr-3" />
                    List New Item
                  </Button>
                </Link>
                <Link to="/browse">
                  <Button className="w-full justify-start" variant="outline">
                    <HeartIcon className="h-5 w-5 mr-3" />
                    Browse Items
                  </Button>
                </Link>
                <Link to="/swaps">
                  <Button className="w-full justify-start" variant="outline">
                    <ClockIcon className="h-5 w-5 mr-3" />
                    View Swaps
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === 'swap' ? 'bg-blue-100' :
                      activity.type === 'earn' ? 'bg-green-100' : 'bg-purple-100'
                    }`}>
                      {activity.type === 'swap' && <ClockIcon className="h-4 w-4 text-blue-600" />}
                      {activity.type === 'earn' && <ArrowTrendingUpIcon className="h-4 w-4 text-green-600" />}
                      {activity.type === 'complete' && <StarIcon className="h-4 w-4 text-purple-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* My Items */}
        {userItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8"
          >
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">My Listed Items</h2>
                <Link to="/my-items" className="text-amber-600 hover:text-amber-700 font-medium">
                  View All
                </Link>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userItems.slice(0, 3).map((item) => (
                  <Link
                    key={item.id}
                    to={`/item/${item.id}`}
                    className="group block"
                  >
                    <div className="bg-gray-50 rounded-lg overflow-hidden group-hover:shadow-md transition-shadow">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{item.category}</span>
                          <span className="text-sm font-medium text-amber-600">{item.points} pts</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;