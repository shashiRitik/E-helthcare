import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Users, 
  Clock, 
  Shield, 
  Calendar, 
  FileText, 
  Stethoscope,
  Award,
  ArrowRight
} from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Easy Appointment Booking',
      description: 'Book appointments with your preferred doctors quickly and easily through our intuitive system.'
    },
    {
      icon: FileText,
      title: 'Digital Medical Records',
      description: 'Securely store and access your medical history, reports, and prescriptions from anywhere.'
    },
    {
      icon: Users,
      title: 'Expert Medical Team',
      description: 'Access to qualified doctors and medical professionals across multiple specializations.'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your medical data is protected with enterprise-grade security and privacy measures.'
    },
  ];

  const stats = [
    { number: '10K+', label: 'Patients Served' },
    { number: '150+', label: 'Medical Professionals' },
    { number: '25+', label: 'Specializations' },
    { number: '99.9%', label: 'Uptime' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Your Health, <br />
                <span className="text-teal-200">Our Priority</span>
              </h1>
              <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                Experience modern healthcare management with our comprehensive digital platform. 
                Book appointments, access medical records, and connect with healthcare professionals 
                - all in one secure location.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/auth/signup"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/auth/login"
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
                >
                  Sign In
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="bg-white bg-opacity-20 rounded-2xl p-8 backdrop-blur-sm">
                  <Stethoscope className="h-32 w-32 text-white mx-auto mb-4" />
                  <div className="text-center">
                    <Award className="h-8 w-8 text-teal-200 mx-auto mb-2" />
                    <p className="text-blue-100">Trusted Healthcare Platform</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose HealthCare+?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with compassionate care 
              to deliver an exceptional healthcare experience for patients and providers alike.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <Clock className="h-16 w-16 text-teal-200 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Healthcare Experience?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of patients and healthcare providers who trust our platform 
              for their medical needs.
            </p>
            <Link
              to="/auth/signup"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;