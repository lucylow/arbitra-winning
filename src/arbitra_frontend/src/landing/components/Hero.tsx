import React from 'react'
import { Scale, ArrowRight, Shield, Zap, Globe } from 'lucide-react'

interface HeroProps {
  onGetStarted?: () => void
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmMWY1ZjkiIGZpbGwtb3BhY2l0eT0iMC40Ij48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-center z-10">
        {/* Logo and Navigation */}
        <div className="flex justify-center items-center space-x-2 mb-12 animate-fade-in-up">
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <Scale className="h-12 w-12 text-blue-600 transform group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-blue-600 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
            </div>
            <span className="text-4xl font-extrabold gradient-text">
              Arbitra
            </span>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="heading-1 text-gray-900 mb-8 leading-tight text-shadow-sm">
          <span className="block">AI-Powered</span>
          <span className="block gradient-text">Dispute Resolution</span>
          <span className="block text-3xl md:text-5xl lg:text-6xl mt-4 font-normal text-gray-700">
            On the Blockchain
          </span>
        </h1>

        <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
          Resolve commercial disputes <span className="font-semibold text-gray-900">instantly</span> with AI arbitration, backed by 
          <span className="font-semibold text-gray-900"> immutable evidence</span> on ICP blockchain and Constellation network.
        </p>

        {/* Key Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
          <div className="flex items-center justify-center space-x-4 bg-white/60 backdrop-blur-sm rounded-2xl px-6 py-4 border border-gray-200/50 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 group">
            <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
              <Zap className="h-6 w-6 text-green-600" />
            </div>
            <span className="font-semibold text-gray-800 text-lg">Instant AI Analysis</span>
          </div>
          <div className="flex items-center justify-center space-x-4 bg-white/60 backdrop-blur-sm rounded-2xl px-6 py-4 border border-gray-200/50 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 group">
            <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <span className="font-semibold text-gray-800 text-lg">Immutable Evidence</span>
          </div>
          <div className="flex items-center justify-center space-x-4 bg-white/60 backdrop-blur-sm rounded-2xl px-6 py-4 border border-gray-200/50 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 group">
            <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
              <Globe className="h-6 w-6 text-purple-600" />
            </div>
            <span className="font-semibold text-gray-800 text-lg">Cross-Chain Settlements</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
          <button 
            onClick={onGetStarted}
            className="btn-primary-enhanced group flex items-center space-x-3 text-lg px-10 py-5"
          >
            <span className="font-bold">Launch Arbitra dApp</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="bg-white/80 backdrop-blur-sm border-2 border-gray-300 text-gray-700 px-10 py-5 rounded-xl font-semibold text-lg hover:border-blue-500 hover:text-blue-600 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-lg">
            View Demo Case
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="text-4xl md:text-5xl font-extrabold gradient-text mb-2">$32K+</div>
            <div className="text-gray-600 font-medium">Hackathon Prize Pool</div>
          </div>
          <div className="text-center bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="text-4xl md:text-5xl font-extrabold gradient-text mb-2">284+</div>
            <div className="text-gray-600 font-medium">Active Hackers</div>
          </div>
          <div className="text-center bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="text-4xl md:text-5xl font-extrabold gradient-text mb-2">19</div>
            <div className="text-gray-600 font-medium">Projects Built</div>
          </div>
          <div className="text-center bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="text-4xl md:text-5xl font-extrabold gradient-text mb-2">&lt;5s</div>
            <div className="text-gray-600 font-medium">AI Analysis Time</div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

