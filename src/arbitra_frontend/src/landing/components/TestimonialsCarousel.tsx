import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

type Testimonial = { name: string; role: string; content: string; rating: number };

const TESTIMONIALS: Testimonial[] = [
  { 
    name: 'Sarah Chen', 
    role: 'Legal Director, TechCorp', 
    content: 'Arbitra reduced our contract dispute time from 3 months to 48 hours. The AI analysis was remarkably accurate and the blockchain evidence tracking eliminated authenticity challenges.', 
    rating: 5 
  },
  { 
    name: 'Marcus Rodriguez', 
    role: 'CEO, SupplyChain', 
    content: 'The cross-border capabilities are game-changing. We resolved a complex international logistics dispute without worrying about jurisdictional issues. The automated settlement saved us weeks of paperwork.', 
    rating: 5 
  },
  { 
    name: 'Dr. Emily Watson', 
    role: 'General Counsel', 
    content: 'As a legal professional, I was skeptical about AI arbitration. But Arbitra\'s explainable reasoning and high confidence scores won me over. It\'s the future of legal dispute resolution.', 
    rating: 5 
  },
];

export const TestimonialsCarousel: React.FC = () => {
  const [i, setI] = useState(0);

  const prev = () => setI((s) => (s - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setI((s) => (s + 1) % TESTIMONIALS.length);

  // Auto-advance every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setI((current) => (current + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="relative">
        <AnimatePresence initial={false} mode="wait">
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -20 }} 
            transition={{ duration: 0.4 }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <blockquote className="text-gray-700 italic text-lg leading-relaxed">"{TESTIMONIALS[i].content}"</blockquote>
                  <div className="mt-4 flex items-center gap-2">
                    {Array.from({ length: TESTIMONIALS[i].rating }).map((_, idx) => (
                      <Star key={idx} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <div className="text-sm text-gray-500 ml-2 font-medium">
                      {TESTIMONIALS[i].name} — {TESTIMONIALS[i].role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button 
          onClick={prev} 
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors border border-gray-200"
          aria-label="Previous testimonial"
        >
          ‹
        </button>
        <button 
          onClick={next} 
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors border border-gray-200"
          aria-label="Next testimonial"
        >
          ›
        </button>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === i ? 'bg-blue-600 w-8' : 'bg-gray-300'
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

