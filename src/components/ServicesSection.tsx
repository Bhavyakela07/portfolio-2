'use client';

import React from 'react';
import { FadeIn } from './FadeIn';

interface ServiceItem {
  number: string;
  name: string;
  description: string;
}

const servicesData: ServiceItem[] = [
  {
    number: '01',
    name: 'AI & RAG Architecture',
    description:
      'Building hybrid RAG pipelines with SpaCy tokenization, Qdrant vector databases, and Llama 3 70B inference to achieve ~90% false-positive reduction.',
  },
  {
    number: '02',
    name: 'Computer Vision (YOLOv8)',
    description:
      'Fine-tuned real-time object detection models for road safety, pothole identification, and spatial LAT/LONG map overlays with sub-second latency.',
  },
  {
    number: '03',
    name: 'Groq LPU Microservices',
    description:
      'High-speed LLM acceleration utilizing custom Groq hardware logic to deliver 18x inference speedups for real-time AI applications.',
  },
  {
    number: '04',
    name: 'Full-Stack Systems',
    description:
      'Designing clean, modern, and production-ready web applications in React 19, TypeScript, and FastAPI with PostgreSQL spatial databases.',
  },
  {
    number: '05',
    name: 'ML Model Optimization',
    description:
      'Calibrated probability prediction models (XGBoost CalibratedClassifierCV) with audit ledgers, policy guardrails, and structured JSON outputs.',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section className="bg-white text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-10 shadow-2xl">
      <div className="max-w-5xl mx-auto">
        
        {/* Heading */}
        <FadeIn delay={0} y={40} className="text-center">
          <h2
            className="text-[#0C0C0C] font-black uppercase tracking-tight leading-none mb-16 sm:mb-20 md:mb-28"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Services
          </h2>
        </FadeIn>

        {/* Vertical List of 5 Services */}
        <div className="flex flex-col">
          {servicesData.map((service, index) => (
            <FadeIn
              key={service.number}
              delay={index * 0.1}
              y={30}
              className="border-b border-[#0C0C0C]/15 py-8 sm:py-10 md:py-12 first:border-t"
            >
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 md:gap-12">
                {/* Left Number */}
                <div
                  className="font-black text-[#0C0C0C] leading-none shrink-0"
                  style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
                >
                  {service.number}
                </div>

                {/* Right Name & Description Stacked */}
                <div className="flex flex-col gap-2 max-w-2xl">
                  <h3
                    className="font-medium uppercase tracking-tight text-[#0C0C0C]"
                    style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                  >
                    {service.name}
                  </h3>
                  <p
                    className="font-light text-[#0C0C0C]/70 leading-relaxed opacity-80"
                    style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                  >
                    {service.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
};
