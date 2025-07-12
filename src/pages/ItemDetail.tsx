import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HeartIcon, 
  ShareIcon, 
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
  ClockIcon,
  TagIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import Button from '../components/UI/Button';
import toast from 'react-hot-toast';

const ItemDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, createSwap } = useApp();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [swapMessage, setSwapMessage] = useState('');
  const [showSwapModal, setShowSwapModal] = useState(false);

  const item = items.find(item => item.id === id);

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Item not found</h2>
          <p className="text-gray-600 mb-4">The item you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === item.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? item.images.length - 1 : prev - 1
    );
  };

  const handleSwapRequest = () => {
    if (!user) {
      toast.error('Please log in to request a swap');
      return;
    }

    if (user.id === item.ownerId) {
      toast.error('You cannot swap with yourself');
      return;
    }

    if (user.points < item.points) {
      toast.error(`You need ${item.points} points to request this swap`);
      return;
    }

    createSwap(item.id, swapMessage);
    toast.success('Swap request sent!');
    setShowSwapModal(false);
    setSwapMessage('');
  };

  const conditionColor = {
    excellent: 'bg-green-100 text-green-800',
    good: 'bg-blue-100 text-blue-800',
    fair: 'bg-yellow-100 text-yellow-800',
    poor: 'bg-red-100 text-red-800'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-xl overflow-hidden shadow-sm">
              <img
                src={item.images[currentImageIndex]}
                alt={item.title}
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              
              {item.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
                  >
                    <ChevronLeftIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
                  >
                    <ChevronRightIcon className="h-5 w-5" />
                  </button>
                </>
              )}

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="flex space-x-2">
                  {item.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Thumbnail Images */}
            {item.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {item.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative rounded-lg overflow-hidden ${
                      index === currentImageIndex ? 'ring-2 ring-amber-500' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${item.title} ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.title}</h1>
                  <div className="flex items-center space-x-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${conditionColor[item.condition]}`}>
                      {item.condition.charAt(0).toUpperCase() + item.condition.slice(1)}
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-600">{item.category}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-600">Size {item.size}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsFavorited(!isFavorited)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    {isFavorited ? (
                      <HeartSolidIcon className="h-6 w-6 text-red-500" />
                    ) : (
                      <HeartIcon className="h-6 w-6 text-gray-400" />
                    )}
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <ShareIcon className="h-6 w-6 text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between py-4 border-t border-b border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600">{item.points}</div>
                  <div className="text-sm text-gray-600">Points Required</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center">
                    <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                    <span className="font-semibold">4.8</span>
                  </div>
                  <div className="text-sm text-gray-600">Owner Rating</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center">
                    <ClockIcon className="h-5 w-5 text-gray-400 mr-1" />
                    <span className="font-semibold">2</span>
                  </div>
                  <div className="text-sm text-gray-600">Days Listed</div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{item.description}</p>
              </div>

              {item.tags.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-amber-100 text-amber-800"
                      >
                        <TagIcon className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Owner Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Listed by</h3>
              <div className="flex items-center space-x-4">
                {item.ownerAvatar ? (
                  <img
                    src={item.ownerAvatar}
                    alt={item.ownerName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <UserCircleIcon className="w-12 h-12 text-gray-400" />
                )}
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.ownerName}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                      4.8 rating
                    </span>
                    <span>25 swaps completed</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View Profile
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              {user && user.id !== item.ownerId ? (
                <div className="space-y-4">
                  <Button
                    onClick={() => setShowSwapModal(true)}
                    className="w-full"
                    size="lg"
                    disabled={user.points < item.points}
                  >
                    {user.points >= item.points 
                      ? `Request Swap (${item.points} points)` 
                      : `Need ${item.points - user.points} more points`
                    }
                  </Button>
                  
                  {user.points < item.points && (
                    <p className="text-sm text-center text-gray-600">
                      You currently have {user.points} points. 
                      <button className="text-amber-600 hover:text-amber-700 ml-1">
                        Earn more points
                      </button>
                    </p>
                  )}
                </div>
              ) : user && user.id === item.ownerId ? (
                <div className="text-center py-4">
                  <p className="text-gray-600 mb-4">This is your listing</p>
                  <div className="flex space-x-3">
                    <Button variant="outline" className="flex-1">
                      Edit Listing
                    </Button>
                    <Button variant="secondary" className="flex-1">
                      Remove Listing
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-600 mb-4">Please log in to request a swap</p>
                  <Button onClick={() => navigate('/login')} className="w-full">
                    Sign In
                  </Button>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Swap Request Modal */}
        {showSwapModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl p-6 w-full max-w-md"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Request Swap</h3>
              <p className="text-gray-600 mb-4">
                Send a message to {item.ownerName} with your swap request.
              </p>
              
              <textarea
                value={swapMessage}
                onChange={(e) => setSwapMessage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 mb-4"
                rows={3}
                placeholder="Hi! I'm interested in swapping for your item..."
              />
              
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowSwapModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSwapRequest}
                  className="flex-1"
                >
                  Send Request
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemDetail;