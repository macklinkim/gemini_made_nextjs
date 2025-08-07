'use client';

import Link from 'next/link';


export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full opacity-60 animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-yellow-300 rounded-full opacity-80 animate-float-delay-1"></div>
        <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-purple-300 rounded-full opacity-40 animate-float-delay-2"></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-pink-300 rounded-full opacity-50 animate-float"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Hero section */}
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Animated welcome text */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-200 animate-fade-in-up">
              Welcome
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 font-light tracking-wide animate-fade-in-up animation-delay-500">
              to the future of digital experiences
            </p>
          </div>

          {/* Subtitle */}
          <p className="text-lg text-purple-200/80 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-1000">
            Discover amazing possibilities with our cutting-edge platform designed to transform the way you interact with technology.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up animation-delay-1500">
            <Link
              href="/login"
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
            </Link>

            <Link
              href="/about"
              className="group px-8 py-4 border-2 border-purple-300/30 text-purple-100 font-semibold rounded-full hover:border-purple-300 hover:bg-purple-300/10 backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              Learn More
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-up animation-delay-2000">
          <div className="group text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:-translate-y-2">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-xl">✨</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Innovative</h3>
            <p className="text-purple-200/70 text-sm">Cutting-edge solutions for modern challenges</p>
          </div>

          <div className="group text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:-translate-y-2">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-xl">🚀</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Fast</h3>
            <p className="text-purple-200/70 text-sm">Lightning-speed performance you can rely on</p>
          </div>

          <div className="group text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:-translate-y-2">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-green-400 to-blue-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-xl">🔒</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Secure</h3>
            <p className="text-purple-200/70 text-sm">Enterprise-grade security for peace of mind</p>
          </div>
        </div>
      </div>
    </div>
  );
}