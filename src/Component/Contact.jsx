import React from 'react';
import { Linkedin } from 'lucide-react';
import me from '../asset/me.png'

const Contact = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-8 perspective-1000">
      <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:rotate-1 hover:shadow-3xl">
        <div className="flex flex-col md:flex-row items-center p-8">
          <div className="w-full md:w-1/2 text-white space-y-6">
            <h2 className="text-4xl font-bold mb-4 transform hover:scale-110 transition-transform duration-200">Meet Me</h2>
            <p className="text-lg leading-relaxed">
              Tanishq Bhosale: A tech wizard who turns air pollution into poetry, co-founded an AI startup, and casually whips up full-stack apps. Warning: May cause sudden bursts of innovation! 😄
            </p>
            <a 
              href="https://www.linkedin.com/in/tanishq-bhosale/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block"
            >
              <button className="bg-white text-indigo-600 font-semibold py-2 px-6 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2">
                <Linkedin size={20} />
                <span>Let's Connect</span>
              </button>
            </a>
          </div>
          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <img 
              src={me} 
              alt="Tanishq Bhosale" 
              className="w-full h-auto rounded-lg shadow-lg transform hover:rotate-3 transition-transform duration-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;