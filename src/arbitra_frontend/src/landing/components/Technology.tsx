import React from 'react'
import { Cpu, Link2, Database, Shield, Zap, Cloud } from 'lucide-react'

const technologies = [
  {
    name: 'Internet Computer Protocol',
    icon: Cloud,
    description: '100% on-chain dApp hosting with web-speed performance and reverse gas model.',
    features: ['Canister Smart Contracts', 'Internet Identity', 'Chain Fusion', 'HTTPS Outcalls'],
    color: 'blue'
  },
  {
    name: 'Constellation Network',
    icon: Database,
    description: 'Immutable evidence anchoring with DAG-based scalable data validation.',
    features: ['Hypergraph Protocol', 'Metagraphs', 'Digital Evidence', 'L0 Standard'],
    color: 'purple'
  },
  {
    name: 'AI Arbitration Engine',
    icon: Cpu,
    description: 'Advanced machine learning for legal pattern recognition and fair ruling generation.',
    features: ['Explainable AI', 'Legal Reasoning', 'Confidence Scoring', 'Pattern Analysis'],
    color: 'green'
  },
  {
    name: 'Cross-Chain Integration',
    icon: Link2,
    description: 'Native Bitcoin and Ethereum integration for universal dispute resolution.',
    features: ['ckBTC Settlements', 'EVM Compatibility', 'Multi-Chain Escrow', 'Chain Key Crypto'],
    color: 'orange'
  },
  {
    name: 'Zero-Knowledge Privacy',
    icon: Shield,
    description: 'Advanced privacy protection for sensitive case data and evidence.',
    features: ['vetKD Technology', 'Encrypted Storage', 'Selective Disclosure', 'Privacy Proofs'],
    color: 'indigo'
  },
  {
    name: 'Smart Contract Automation',
    icon: Zap,
    description: 'Automated settlement execution with tamper-proof smart contracts.',
    features: ['Automatic Payouts', 'Multi-sig Escrow', 'Conditional Logic', 'Dispute Resolution'],
    color: 'red'
  }
]

export const Technology: React.FC = () => {
  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      purple: 'bg-purple-100 text-purple-600',
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      orange: 'bg-orange-100 text-orange-600',
      red: 'bg-red-100 text-red-600',
      indigo: 'bg-indigo-100 text-indigo-600'
    }
    return colors[color] || colors.blue
  }

  const getDotColor = (color: string) => {
    const colors: Record<string, string> = {
      purple: 'bg-purple-500',
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      orange: 'bg-orange-500',
      red: 'bg-red-500',
      indigo: 'bg-indigo-500'
    }
    return colors[color] || colors.blue
  }

  return (
    <section id="technology" className="section-spacing bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-100 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-purple-100 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-2 text-gray-900 mb-4">
            Powered by Cutting-Edge Technology
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built on the most advanced blockchain and AI technologies to deliver 
            unprecedented speed, security, and fairness in dispute resolution.
          </p>
        </div>

        {/* Technology Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="feature-card group bg-gradient-to-br from-white to-gray-50"
            >
              {/* Icon */}
              <div className={`w-16 h-16 ${getColorClasses(tech.color)} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                <tech.icon className="h-8 w-8" />
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {tech.name}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                {tech.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {tech.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                    <div className={`w-1.5 h-1.5 ${getDotColor(tech.color)} rounded-full`}></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Integration Diagram */}
        <div className="mt-20 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Seamless Technology Integration
            </h3>
            <p className="text-gray-600">
              How our technology stack works together to deliver end-to-end dispute resolution
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center mb-4">
              <div className="bg-white p-4 rounded-xl border border-blue-200 shadow-sm">
                <div className="text-blue-600 font-semibold">User Interface</div>
                <div className="text-xs text-gray-500 mt-1">React + TypeScript</div>
              </div>
              <div className="flex items-center justify-center text-gray-400 text-2xl">
                ↓
              </div>
              <div className="bg-white p-4 rounded-xl border border-purple-200 shadow-sm">
                <div className="text-purple-600 font-semibold">ICP Blockchain</div>
                <div className="text-xs text-gray-500 mt-1">Smart Contracts</div>
              </div>
              <div className="flex items-center justify-center text-gray-400 text-2xl">
                ↓
              </div>
              <div className="bg-white p-4 rounded-xl border border-green-200 shadow-sm">
                <div className="text-green-600 font-semibold">AI Engine</div>
                <div className="text-xs text-gray-500 mt-1">Analysis & Ruling</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-white p-4 rounded-xl border border-orange-200 shadow-sm">
                <div className="text-orange-600 font-semibold">Constellation</div>
                <div className="text-xs text-gray-500 mt-1">Evidence Anchoring</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-indigo-200 shadow-sm">
                <div className="text-indigo-600 font-semibold">Cross-Chain</div>
                <div className="text-xs text-gray-500 mt-1">Settlement Execution</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-red-200 shadow-sm">
                <div className="text-red-600 font-semibold">Privacy Layer</div>
                <div className="text-xs text-gray-500 mt-1">Data Protection</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


