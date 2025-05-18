"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Github, Layers, MoonStar, Sun, GraduationCap, Database, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Dynamic background from pocoloco.io */}
      <style jsx global>{`
        @keyframes path0 {
          0% {
            transform: rotate(-10deg);
          }
          100% {
            transform: rotate(10deg);
          }
        }
        @keyframes path1 {
          0% {
            transform: rotate(-30deg);
          }
          100% {
            transform: rotate(30deg);
          }
        }
        @keyframes path2 {
          0% {
            transform: rotate(40deg);
          }
          100% {
            transform: rotate(-40deg);
          }
        }
        
        .background--custom {
          position: fixed;
          width: 100vw;
          height: 100vh;
          z-index: -20;
          top: 0;
          left: 0;
        }
        
        path {
          transform-origin: 50% 0%;
        }
      `}</style>
      
      <svg className="background--custom" id="demo" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path fill="#FFFF00" fillOpacity="0.7" d="M-100 -100L200 -100L200 50L-100 50Z" style={{animation: "path0 5s linear infinite alternate"}} />
        <path fill="#00FFFF" fillOpacity="0.7" d="M-100 -100L200 -100L200 50L-100 50Z" style={{animation: "path1 12.5s linear infinite alternate"}} />
        <path fill="#FF00FF" fillOpacity="0.2" d="M-100 -100L200 -100L200 20L-100 20Z" style={{animation: "path2 30s linear infinite alternate"}} />
      </svg>
      
      {/* Background gradient overlay for better readability */}
      <div className="fixed inset-0 bg-gradient-to-br from-white/40 via-white/40 to-white/40 dark:from-gray-900/60 dark:via-gray-900/60 dark:to-gray-900/60 backdrop-blur-sm -z-10" />
      
      {/* Background noise pattern */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] -z-10" />
      
      {/* Content */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <main className="flex flex-col gap-24">
          {/* Hero Section */}
          <section className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
            <div className="flex-1 space-y-8 text-center lg:text-left animate-[fadeIn_1.5s_ease-out]">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 text-transparent bg-clip-text tracking-tight">
                YUV.AI Boilerplate
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl">
                A clean, minimal foundation to build your next extraordinary project with modern technologies
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <Link 
                  href="/api/health" 
                  className="group flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Get Started 
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="https://github.com/yuvaladani" 
                  target="_blank"
                  className="flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium bg-white/80 dark:bg-gray-800/80 border border-white/20 dark:border-gray-700/30 rounded-full shadow-sm hover:shadow-md backdrop-blur-md transition-all duration-300 hover:bg-white dark:hover:bg-gray-800"
                >
                  GitHub <Github className="w-5 h-5" />
                </Link>
              </div>
            </div>
            
            <div className="flex-1 relative h-[400px] w-full max-w-[500px] mx-auto lg:mx-0 animate-[fadeIn_2s_ease-out]">
              <div className="absolute inset-0 rounded-[40px] overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-700">
                <Image 
                  src="https://picsum.photos/seed/yuv/1000/1000" 
                  alt="YUV.AI Hero" 
                  fill 
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30 dark:from-blue-900/40 dark:to-purple-900/40 mix-blend-overlay" />
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-purple-100/50 dark:from-blue-950/50 dark:to-purple-950/50 rounded-[40px] -z-10 backdrop-blur-2xl" />
            <div className="px-6 py-16 md:p-16 rounded-[40px] border border-white/20 dark:border-gray-800/30 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl shadow-lg">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">
                Powerful Features
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "NextJS 15",
                    description: "Latest features with App Router for the most modern development experience",
                    icon: <Layers className="w-10 h-10 text-blue-500" />,
                    delay: "0"
                  },
                  {
                    title: "Authentication",
                    description: "Secure user management and authentication with Clerk integration",
                    icon: <GraduationCap className="w-10 h-10 text-purple-500" />,
                    delay: "300"
                  },
                  {
                    title: "MongoDB Atlas",
                    description: "Scalable database integration for your application's data needs",
                    icon: <Database className="w-10 h-10 text-pink-500" />,
                    delay: "600"
                  }
                ].map((feature, i) => (
                  <div 
                    key={i}
                    className="flex flex-col items-center p-8 rounded-[30px] bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group"
                    style={{
                      animationDelay: `${feature.delay}ms`,
                      animationFillMode: "both"
                    }}
                  >
                    <div className="mb-6 p-4 rounded-full bg-blue-50 dark:bg-blue-900/20 group-hover:bg-gradient-to-br group-hover:from-blue-100 group-hover:to-purple-100 dark:group-hover:from-blue-900/30 dark:group-hover:to-purple-900/30 transition-all duration-500">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-semibold mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 dark:group-hover:from-blue-400 dark:group-hover:to-purple-400 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-500">
                      {feature.title}
                    </h3>
                    <p className="text-center text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Call to Action */}
          <section className="flex flex-col items-center text-center gap-8 my-12">
            <Sparkles className="w-12 h-12 text-yellow-500 animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
              Ready to Start Building?
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl">
              Begin your journey with YUV.AI's powerful boilerplate and create something amazing
            </p>
            <Link 
              href="/api/health" 
              className="group flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full shadow-md hover:shadow-lg transition-all mt-4"
            >
              Get Started 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-24 py-12 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col items-center justify-center gap-8">
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Link 
                href="https://linktr.ee/yuvaladani" 
                target="_blank"
                className="text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
              >
                <span className="w-1 h-1 rounded-full bg-blue-500"></span>Linktree
              </Link>
              <Link 
                href="https://twitter.com/yuvaladani" 
                target="_blank"
                className="text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
              >
                <span className="w-1 h-1 rounded-full bg-blue-500"></span>Twitter
              </Link>
              <Link 
                href="https://instagram.com/yuvaladani" 
                target="_blank"
                className="text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
              >
                <span className="w-1 h-1 rounded-full bg-blue-500"></span>Instagram
              </Link>
              <Link 
                href="https://yuv.ai/blog" 
                target="_blank"
                className="text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
              >
                <span className="w-1 h-1 rounded-full bg-blue-500"></span>Blog
              </Link>
            </div>
            <div className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-400/10 dark:to-purple-400/10 backdrop-blur-xl border border-white/10 dark:border-gray-800/30">
              <p className="text-base font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse">
                "Fly High With YUV.AI"
              </p>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Created by Yuval Avidani, AI Builder & Speaker
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
