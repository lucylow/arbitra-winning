import React from 'react';
import { motion } from 'framer-motion';

export const EvidenceAnchorVisualizer: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 bg-white rounded-2xl border border-gray-200 p-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Evidence Anchoring Process</h3>
        <p className="text-gray-600">See how documents are securely anchored to the blockchain</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Paper */}
        <div className="flex items-center justify-center">
          <motion.div 
            className="w-56 h-40 bg-white border border-gray-200 rounded shadow-sm p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="h-3 bg-gray-200 rounded mb-2" />
            <div className="h-3 bg-gray-200 rounded mb-2" />
            <div className="h-3 bg-gray-200 rounded w-3/4" />
            <div className="mt-4 text-sm text-gray-500">Original Contract.pdf</div>
          </motion.div>
        </div>

        {/* Transformation */}
        <div className="flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <svg width="220" height="160" viewBox="0 0 220 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.circle 
                cx="110" 
                cy="80" 
                r="40" 
                stroke="#00E5FF" 
                strokeWidth="2" 
                fill="rgba(0,229,255,0.06)"
                animate={{ 
                  strokeDasharray: ["0 251", "251 251"],
                  strokeDashoffset: [0, 251],
                }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
              <motion.line 
                x1="40" 
                y1="80" 
                x2="80" 
                y2="80" 
                stroke="#C0C0C0" 
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1 }}
              />
              <motion.line 
                x1="140" 
                y1="80" 
                x2="180" 
                y2="80" 
                stroke="#C0C0C0" 
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              <text x="110" y="85" textAnchor="middle" fill="#00E5FF" fontSize="10" fontFamily="monospace">hash: c4a91f8b…</text>
            </svg>
            <div className="mt-2 text-sm text-gray-500 font-medium">Document → Cryptographic Hash</div>
          </motion.div>
        </div>

        {/* Nodes */}
        <div className="flex items-center justify-center">
          <div className="flex flex-col gap-3">
            {['Node-A','Node-B','Node-C'].map((n, i) => (
              <motion.div 
                key={n} 
                initial={{ x: 30, opacity: 0 }} 
                animate={{ x: 0, opacity: 1 }} 
                transition={{ delay: 0.1 * i, duration: 0.6 }}
                className="flex items-center gap-3"
              >
                <motion.div 
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg flex items-center justify-center text-white text-xs font-bold"
                  whileHover={{ scale: 1.1 }}
                >
                  {n.split('-')[1]}
                </motion.div>
                <div className="text-sm text-gray-700 font-medium">{n}</div>
              </motion.div>
            ))}
            <div className="mt-2 text-xs text-gray-500 text-center">Anchored across multiple consensus nodes</div>
          </div>
        </div>
      </div>
    </div>
  );
};


