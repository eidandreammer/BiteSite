'use client'

import { motion } from 'framer-motion'
import { Palette, Smartphone, Zap, Target, Users, Shield } from 'lucide-react'

const features = [
  {
    icon: Palette,
    title: 'Custom Design',
    description: 'Every website is uniquely designed to match your brand identity and business goals. No templates, no cookie-cutter solutions.',
    color: 'text-blue-600'
  },
  {
    icon: Smartphone,
    title: 'Mobile-First',
    description: 'Responsive design that looks and works perfectly on all devices, from smartphones to desktop computers.',
    color: 'text-green-600'
  },
  {
    icon: Zap,
    title: 'Fast Performance',
    description: 'Optimized for speed and performance, ensuring your visitors have the best possible experience.',
    color: 'text-yellow-600'
  },
  {
    icon: Target,
    title: 'Conversion Focused',
    description: 'Designed with your business goals in mind, optimized to convert visitors into customers.',
    color: 'text-red-600'
  },
  {
    icon: Users,
    title: 'User Experience',
    description: 'Intuitive navigation and user-friendly interfaces that keep visitors engaged and coming back.',
    color: 'text-purple-600'
  },
  {
    icon: Shield,
    title: 'SEO Optimized',
    description: 'Built with search engine optimization in mind, helping your website rank higher in search results.',
    color: 'text-indigo-600'
  }
]

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Web Design Services?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We combine creativity with technical expertise to deliver websites that not only look great 
            but also drive real business results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary to-accent p-8 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Transform Your Online Presence?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Let's discuss your project and create something amazing together.
            </p>
            <a
              href="#start-project"
              className="inline-flex items-center px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Start Your Project
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
