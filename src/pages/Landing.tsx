import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRightIcon, 
  HandRaisedIcon, 
  HeartIcon, 
  CurrencyDollarIcon,
  UserGroupIcon,
  SparklesIcon,
  StarIcon
} from '@heroicons/react/24/outline';

const Landing: React.FC = () => {
  const features = [
    {
      icon: HandRaisedIcon,
      title: 'Swap & Share',
      description: 'Exchange your unused clothes with community members through our smart point system.'
    },
    {
      icon: HeartIcon,
      title: 'Sustainable Fashion',
      description: 'Reduce waste and promote circular fashion by giving clothes a second life.'
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Earn Points',
      description: 'Get points for sharing items and use them to get new pieces from the community.'
    },
    {
      icon: UserGroupIcon,
      title: 'Community Driven',
      description: 'Join a community of fashion-conscious individuals committed to sustainable living.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Fashion Enthusiast',
      image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
      quote: 'ReWear has completely changed how I think about fashion. I\'ve discovered amazing pieces while helping the environment!'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Sustainable Living Advocate',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
      quote: 'The point system is genius! I\'ve saved money and found unique pieces I never would have discovered otherwise.'
    },
    {
      name: 'Emma Johnson',
      role: 'College Student',
      image: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
      quote: 'Perfect for students on a budget. I\'ve refreshed my entire wardrobe without spending a fortune!'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <StarIcon className="h-8 w-8 text-amber-600" />
              <span className="text-2xl font-bold text-gray-900">ReWear</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-amber-600 font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors font-medium"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Fashion That{' '}
              <span className="text-amber-600 relative">
                Gives Back
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="absolute bottom-0 left-0 right-0 h-2 bg-amber-200 -z-10"
                />
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Join the sustainable fashion revolution. Swap, share, and discover amazing clothing pieces 
              while building a community that cares about our planet's future.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/register"
                className="bg-amber-600 text-white px-8 py-4 rounded-lg hover:bg-amber-700 transition-all duration-200 font-semibold text-lg flex items-center group shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Start Swapping Today
                <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/login"
                className="border-2 border-amber-600 text-amber-600 px-8 py-4 rounded-lg hover:bg-amber-50 transition-all duration-200 font-semibold text-lg"
              >
                Sign In
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-20 left-10 w-16 h-16 bg-amber-200 rounded-full opacity-20"
        />
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-40 right-20 w-12 h-12 bg-orange-200 rounded-full opacity-20"
        />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How ReWear Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our simple, point-based system makes sustainable fashion accessible and rewarding for everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
                  <feature.icon className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Making a Real Impact
            </h2>
            <p className="text-xl opacity-90">
              Together, we're building a more sustainable future
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold mb-2">10,000+</div>
              <div className="text-xl opacity-90">Items Exchanged</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold mb-2">5,000+</div>
              <div className="text-xl opacity-90">Community Members</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold mb-2">25 tons</div>
              <div className="text-xl opacity-90">Textile Waste Saved</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Community Says
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from real members of the ReWear community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <SparklesIcon className="h-16 w-16 text-amber-600 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to Transform Your Wardrobe?
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join thousands of fashion-forward individuals who are making sustainable choices 
              while discovering amazing new pieces. Start your journey today!
            </p>
            <Link
              to="/register"
              className="bg-amber-600 text-white px-8 py-4 rounded-lg hover:bg-amber-700 transition-all duration-200 font-semibold text-lg inline-flex items-center group shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Join ReWear Community
              <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <StarIcon className="h-8 w-8 text-amber-500" />
              <span className="text-2xl font-bold">ReWear</span>
            </div>
            <p className="text-gray-400 mb-6">
              Building a sustainable future, one swap at a time.
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;