import React from 'react'
import { Building, Users, Globe, CreditCard, Truck, FileText } from 'lucide-react'

const useCases = [
  {
    icon: Building,
    title: 'Enterprise Contracts',
    description: 'Resolve B2B contract disputes efficiently with AI-powered analysis of complex commercial agreements.',
    examples: ['Service Level Agreements', 'Supply Chain Contracts', 'Partnership Disputes'],
    stats: '70% faster resolution',
    color: 'blue'
  },
  {
    icon: Users,
    title: 'Consumer Protection',
    description: 'Protect consumer rights with accessible, low-cost dispute resolution for e-commerce and services.',
    examples: ['Product Quality Issues', 'Service Delivery Disputes', 'Refund Claims'],
    stats: '90% cost reduction',
    color: 'green'
  },
  {
    icon: Globe,
    title: 'Cross-Border Commerce',
    description: 'Overcome jurisdictional challenges with blockchain-based international dispute resolution.',
    examples: ['International Trade', 'Remote Work Agreements', 'Global Services'],
    stats: 'No borders limitation',
    color: 'purple'
  },
  {
    icon: CreditCard,
    title: 'DeFi & Crypto',
    description: 'Secure resolution for decentralized finance disputes and smart contract interpretations.',
    examples: ['DeFi Protocol Issues', 'Token Disputes', 'DAO Governance'],
    stats: '100% on-chain',
    color: 'orange'
  },
  {
    icon: Truck,
    title: 'Supply Chain',
    description: 'Streamline logistics disputes with immutable evidence tracking and automated settlements.',
    examples: ['Delivery Delays', 'Quality Assurance', 'Payment Terms'],
    stats: 'Real-time tracking',
    color: 'indigo'
  },
  {
    icon: FileText,
    title: 'Legal Documentation',
    description: 'Verify and enforce legal document authenticity with cryptographic proof and AI analysis.',
    examples: ['Contract Verification', 'Document Integrity', 'Digital Signatures'],
    stats: 'Immutable proof',
    color: 'red'
  }
]

export const UseCases: React.FC = () => {
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

  const getButtonColor = (color: string) => {
    const colors: Record<string, string> = {
      purple: 'bg-purple-50 text-purple-700 hover:bg-purple-100',
      blue: 'bg-blue-50 text-blue-700 hover:bg-blue-100',
      green: 'bg-green-50 text-green-700 hover:bg-green-100',
      orange: 'bg-orange-50 text-orange-700 hover:bg-orange-100',
      red: 'bg-red-50 text-red-700 hover:bg-red-100',
      indigo: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
    }
    return colors[color] || colors.blue
  }

  return (
    <section id="use-cases" className="section-spacing bg-gray-50 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-green-200 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-blue-200 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-2 text-gray-900 mb-4">
            Trusted Across Industries
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Arbitra's flexible platform adapts to diverse dispute resolution needs, 
            from enterprise contracts to consumer protection.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="feature-card group bg-white"
            >
              {/* Icon and Header */}
              <div className="flex items-start justify-between mb-6">
                <div className={`w-14 h-14 ${getColorClasses(useCase.color)} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                  <useCase.icon className="h-7 w-7" />
                </div>
                <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {useCase.stats}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {useCase.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                {useCase.description}
              </p>

              {/* Examples */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Common Cases
                </h4>
                <ul className="space-y-1">
                  {useCase.examples.map((example, exampleIndex) => (
                    <li key={exampleIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className={`w-1.5 h-1.5 ${getDotColor(useCase.color)} rounded-full`}></div>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hover Action */}
              <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className={`w-full ${getButtonColor(useCase.color)} py-2 rounded-lg font-semibold text-sm transition-colors duration-200`}>
                  View Case Study →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Industry Adoption */}
        <div className="mt-20 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Adopted by Industry Leaders
            </h3>
            <p className="text-gray-600">
              Trusted by forward-thinking organizations across multiple sectors
            </p>
          </div>

          {/* Logos Grid - Mock */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-60">
            {['Tech Corp', 'LegalChain', 'Global Trade', 'FinTech Inc', 'SupplyLogix', 'eCommerce Pro'].map((company, index) => (
              <div key={index} className="text-gray-400 font-semibold text-lg">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


