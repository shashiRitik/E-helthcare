import React from 'react';
import { Heart, Target, Eye, Users, Award, Shield } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: Heart,
      title: 'Compassionate Care',
      description: 'We put patients first, ensuring every interaction is filled with empathy and understanding.'
    },
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'Your health data is protected with the highest security standards and complete privacy.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of healthcare delivery and technology innovation.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We believe in the power of teamwork between patients, doctors, and healthcare providers.'
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-teal-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About HealthCare+</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Revolutionizing healthcare through technology, compassion, and innovation. 
            We're building the future of medical care, one patient at a time.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="text-center lg:text-left">
              <Target className="h-16 w-16 text-blue-600 mx-auto lg:mx-0 mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                To democratize healthcare by providing accessible, efficient, and secure digital 
                health management solutions that connect patients with quality healthcare providers. 
                We believe everyone deserves access to excellent medical care, regardless of their 
                location or circumstances.
              </p>
            </div>
            <div className="text-center lg:text-left">
              <Eye className="h-16 w-16 text-teal-600 mx-auto lg:mx-0 mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                To create a world where healthcare is seamlessly integrated into people's lives 
                through technology, where medical records are instantly accessible, appointments 
                are effortlessly scheduled, and the gap between patients and healthcare providers 
                is eliminated through digital innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do and shape the way we serve 
              our community of patients and healthcare providers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Our Story
            </h2>
            <div className="text-lg text-gray-600 leading-relaxed space-y-6">
              <p>
                HealthCare+ was founded in 2020 with a simple yet powerful vision: to make 
                healthcare more accessible, efficient, and patient-centered through technology. 
                Our founders, a team of healthcare professionals and tech innovators, recognized 
                the need for a comprehensive platform that could bridge the gap between patients 
                and healthcare providers.
              </p>
              <p>
                What started as a small initiative to digitize medical records has grown into 
                a full-featured healthcare management platform that serves thousands of patients 
                and hundreds of healthcare providers. We've maintained our commitment to putting 
                patients first while continuously innovating to meet the evolving needs of the 
                healthcare industry.
              </p>
              <p>
                Today, HealthCare+ stands as a testament to what's possible when technology 
                meets compassion. We're not just a healthcare platform - we're partners in 
                your health journey, committed to making quality healthcare accessible to all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Making a Difference
            </h2>
            <p className="text-xl text-blue-100">
              Our impact on the healthcare community continues to grow
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">10,000+</div>
              <div className="text-blue-100">Patients Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">150+</div>
              <div className="text-blue-100">Healthcare Providers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">25+</div>
              <div className="text-blue-100">Medical Specializations</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">99.9%</div>
              <div className="text-blue-100">Platform Uptime</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;