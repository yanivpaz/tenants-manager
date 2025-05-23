"use client";

import Link from "next/link";
import { ArrowRight, Brain, Search, BarChart3, Sparkles, Users, FileText, Target } from "lucide-react";

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
        <path fill="#00CED1" fillOpacity="0.7" d="M-100 -100L200 -100L200 50L-100 50Z" style={{animation: "path0 5s linear infinite alternate"}} />
        <path fill="#4169E1" fillOpacity="0.7" d="M-100 -100L200 -100L200 50L-100 50Z" style={{animation: "path1 12.5s linear infinite alternate"}} />
        <path fill="#9370DB" fillOpacity="0.2" d="M-100 -100L200 -100L200 20L-100 20Z" style={{animation: "path2 30s linear infinite alternate"}} />
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
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 text-transparent bg-clip-text tracking-tight">
                  NILE INSIGHTS
                </h1>
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                  <Brain className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  <span className="text-xl font-semibold text-blue-600 dark:text-blue-400 tracking-wide">
                    AI RESEARCH PLATFORM
                  </span>
                </div>
              </div>
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl leading-relaxed">
                Transform your research workflow with intelligent insights, automated analysis, and collaborative tools powered by advanced AI
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <Link 
                  href="/dashboard" 
                  className="group flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Start Research 
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/sign-in" 
                  className="flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium bg-white/80 dark:bg-gray-800/80 border border-white/20 dark:border-gray-700/30 rounded-full shadow-sm hover:shadow-md backdrop-blur-md transition-all duration-300 hover:bg-white dark:hover:bg-gray-800"
                >
                  Sign In <Users className="w-5 h-5" />
                </Link>
              </div>
            </div>
            
            <div className="flex-1 relative h-[400px] w-full max-w-[500px] mx-auto lg:mx-0 animate-[fadeIn_2s_ease-out]">
              <div className="absolute inset-0 rounded-[40px] overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-700">
                <div className="w-full h-full bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <Brain className="w-24 h-24 mx-auto mb-6 animate-pulse" />
                    <h3 className="text-2xl font-bold mb-4">AI-Powered Research</h3>
                    <div className="space-y-2 text-sm opacity-90">
                      <div className="flex items-center gap-2 justify-center">
                        <Search className="w-4 h-4" />
                        <span>Intelligent Analysis</span>
                      </div>
                      <div className="flex items-center gap-2 justify-center">
                        <BarChart3 className="w-4 h-4" />
                        <span>Data Insights</span>
                      </div>
                      <div className="flex items-center gap-2 justify-center">
                        <Users className="w-4 h-4" />
                        <span>Team Collaboration</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent mix-blend-overlay" />
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-100/50 to-blue-100/50 dark:from-cyan-950/50 dark:to-blue-950/50 rounded-[40px] -z-10 backdrop-blur-2xl" />
            <div className="px-6 py-16 md:p-16 rounded-[40px] border border-white/20 dark:border-gray-800/30 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl shadow-lg">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 text-transparent bg-clip-text">
                Intelligent Research Tools
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "AI Analysis",
                    description: "Advanced machine learning algorithms analyze your research data to uncover hidden patterns and insights",
                    icon: <Brain className="w-10 h-10 text-cyan-500" />,
                    delay: "0"
                  },
                  {
                    title: "Smart Insights",
                    description: "Automated insight generation from qualitative and quantitative data with contextual recommendations",
                    icon: <BarChart3 className="w-10 h-10 text-blue-500" />,
                    delay: "300"
                  },
                  {
                    title: "Team Collaboration",
                    description: "Real-time collaboration tools for research teams with shared workspaces and project management",
                    icon: <Users className="w-10 h-10 text-purple-500" />,
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
                    <div className="mb-6 p-4 rounded-full bg-cyan-50 dark:bg-cyan-900/20 group-hover:bg-gradient-to-br group-hover:from-cyan-100 group-hover:to-blue-100 dark:group-hover:from-cyan-900/30 dark:group-hover:to-blue-900/30 transition-all duration-500">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-semibold mb-3 group-hover:bg-gradient-to-r group-hover:from-cyan-600 group-hover:to-blue-600 dark:group-hover:from-cyan-400 dark:group-hover:to-blue-400 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-500">
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

          {/* Research Workflow Section */}
          <section className="relative">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400 text-transparent bg-clip-text">
                Streamlined Research Workflow
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                From project setup to final insights, NILE INSIGHTS guides you through every step of your research journey
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: "01",
                  title: "Project Setup",
                  description: "Define research goals, questions, and team structure",
                  icon: <Target className="w-6 h-6 text-green-600" />,
                  color: "from-green-500 to-emerald-600"
                },
                {
                  step: "02", 
                  title: "Data Collection",
                  description: "Upload resources, conduct interviews, gather insights",
                  icon: <FileText className="w-6 h-6 text-blue-600" />,
                  color: "from-blue-500 to-cyan-600"
                },
                {
                  step: "03",
                  title: "AI Analysis",
                  description: "Automated pattern recognition and insight generation",
                  icon: <Brain className="w-6 h-6 text-purple-600" />,
                  color: "from-purple-500 to-indigo-600"
                },
                {
                  step: "04",
                  title: "Research Insights",
                  description: "Actionable findings and comprehensive reporting",
                  icon: <BarChart3 className="w-6 h-6 text-orange-600" />,
                  color: "from-orange-500 to-red-600"
                }
              ].map((step, i) => (
                <div key={i} className="relative group">
                  <div className="p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-lg mb-4`}>
                      {step.step}
                    </div>
                    <div className="mb-3 p-2 rounded-lg bg-gray-100 dark:bg-gray-700/50 w-fit">
                      {step.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {step.description}
                    </p>
                  </div>
                  {i < 3 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700"></div>
                  )}
                </div>
              ))}
            </div>
          </section>
          
          {/* Call to Action */}
          <section className="flex flex-col items-center text-center gap-8 my-12">
            <Sparkles className="w-12 h-12 text-cyan-500 animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 text-transparent bg-clip-text">
              Ready to Transform Your Research?
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl">
              Join researchers worldwide who are accelerating discoveries with NILE INSIGHTS
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/dashboard" 
                className="group flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-full shadow-md hover:shadow-lg transition-all"
              >
                Start Your Research Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/api/health" 
                className="flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium border-2 border-cyan-600 dark:border-cyan-400 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-600 hover:text-white dark:hover:bg-cyan-400 dark:hover:text-gray-900 rounded-full transition-all"
              >
                View Demo
              </Link>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-24 py-12 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col items-center justify-center gap-8">
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Link 
                href="https://linktr.ee/yuvaladani" 
                target="_blank"
                className="text-sm hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-2"
              >
                <span className="w-1 h-1 rounded-full bg-cyan-500"></span>Linktree
              </Link>
              <Link 
                href="https://twitter.com/yuvaladani" 
                target="_blank"
                className="text-sm hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-2"
              >
                <span className="w-1 h-1 rounded-full bg-cyan-500"></span>Twitter
              </Link>
              <Link 
                href="https://instagram.com/yuvaladani" 
                target="_blank"
                className="text-sm hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-2"
              >
                <span className="w-1 h-1 rounded-full bg-cyan-500"></span>Instagram
              </Link>
              <Link 
                href="https://yuv.ai/blog" 
                target="_blank"
                className="text-sm hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-2"
              >
                <span className="w-1 h-1 rounded-full bg-cyan-500"></span>Blog
              </Link>
            </div>
            <div className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-600/10 to-blue-600/10 dark:from-cyan-400/10 dark:to-blue-400/10 backdrop-blur-xl border border-white/10 dark:border-gray-800/30">
              <p className="text-base font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-pulse">
                &ldquo;Fly High With YUV.AI&rdquo;
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
