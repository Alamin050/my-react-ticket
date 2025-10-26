import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const LandingPage = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="flex flex-col min-h-screen max-w-[1440px] mx-auto">
      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative text-center py-20 overflow-hidden bg-gradient-to-br from-blue-700 via-sky-600 to-teal-500 min-h-screen flex items-center justify-center">
          {/* Decorative Soft Blobs */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute w-[350px] h-[350px] bg-white/10 rounded-full top-16 left-10 blur-3xl"></div>
            <div className="absolute w-[500px] h-[500px] bg-sky-400/20 rounded-full bottom-10 right-10 blur-3xl"></div>
          </div>

          {/* HERO CONTENT */}
          <div className="relative z-10 text-white px-6">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-md">
              Empower Your Support Team with{" "}
              <span className="text-yellow-300">TicketApp</span>
            </h1>
            <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-blue-100">
              Streamline your customer service and manage support tickets
              effortlessly — all in one place.
            </p>
            <div className="flex justify-center gap-5 flex-wrap">
              <Link to="/tickets">
                <button className="bg-yellow-400 text-gray-900 font-semibold py-3 px-8 rounded-xl shadow-lg hover:bg-yellow-300 transition duration-300">
                  Get Started
                </button>
              </Link>
              {!isLoggedIn && (
                <Link to="/auth/login">
                  <button className="bg-white/20 text-white border border-white/30 font-semibold py-3 px-8 rounded-xl hover:bg-white/30 transition duration-300">
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>

          {/* Wavy SVG (Updated Shape + Gradient Fill) */}
          <div className="absolute bottom-0 left-0 w-full mb-[-1px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              className="w-full h-auto"
            >
              <defs>
                <linearGradient id="waveGradient" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="100%" stopColor="#f8fafc" stopOpacity="1" />
                </linearGradient>
              </defs>
              <path
                fill="url(#waveGradient)"
                d="M0,256L60,245.3C120,235,240,213,360,186.7C480,160,600,128,720,144C840,160,960,224,1080,234.7C1200,245,1320,203,1380,181.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
              ></path>
            </svg>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="py-20 text-center bg-gradient-to-b from-white to-slate-50">
          <h2 className="text-4xl font-extrabold mb-12 text-gray-800">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto px-6">
            <div className="p-8 bg-blue-50 hover:bg-blue-100 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-semibold mb-3 text-blue-800">
                Easy to Use
              </h3>
              <p className="text-gray-600">
                Navigate through tickets effortlessly with a clean, intuitive
                interface.
              </p>
            </div>
            <div className="p-8 bg-teal-50 hover:bg-teal-100 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-semibold mb-3 text-teal-800">
                Seamless Integrations
              </h3>
              <p className="text-gray-600">
                Connect with your favorite apps for a unified support
                experience.
              </p>
            </div>
            <div className="p-8 bg-indigo-50 hover:bg-indigo-100 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-semibold mb-3 text-indigo-800">
                24/7 Assistance
              </h3>
              <p className="text-gray-600">
                Our dedicated team ensures your success around the clock.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
