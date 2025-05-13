
import React from 'react';
import { Sparkles } from '@/components/ui/sparkles-effect';

export const ValuesTable: React.FC = () => {
  return (
    <section>
      <Sparkles>
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <span className="mr-2">💡</span> Our Values
        </h2>
      </Sparkles>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b py-2 px-4 text-left font-semibold">Value</th>
              <th className="border-b py-2 px-4 text-left font-semibold">What It Means to Us</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-muted/20">
              <td className="border-b py-3 px-4 font-medium">Curiosity Over Conformity</td>
              <td className="border-b py-3 px-4">We reward questions, not just right answers.</td>
            </tr>
            <tr className="hover:bg-muted/20">
              <td className="border-b py-3 px-4 font-medium">Empathy in AI</td>
              <td className="border-b py-3 px-4">SARAS doesn't just talk — she listens, understands, and cares.</td>
            </tr>
            <tr className="hover:bg-muted/20">
              <td className="border-b py-3 px-4 font-medium">India First</td>
              <td className="border-b py-3 px-4">We root learning in India's culture, language, and pride.</td>
            </tr>
            <tr className="hover:bg-muted/20">
              <td className="border-b py-3 px-4 font-medium">Accessible for All</td>
              <td className="border-b py-3 px-4">Whether in villages or cities, on phones or tablets — every child deserves smart, quality learning.</td>
            </tr>
            <tr className="hover:bg-muted/20">
              <td className="border-b py-3 px-4 font-medium">Invent the Future</td>
              <td className="border-b py-3 px-4">Children don't just study history — they're inspired to build what's next.</td>
            </tr>
            <tr className="hover:bg-muted/20">
              <td className="border-b py-3 px-4 font-medium">Equal Access</td>
              <td className="border-b py-3 px-4">Rich or poor, urban or rural — we bring the same experience and care to every learner.</td>
            </tr>
            <tr className="hover:bg-muted/20">
              <td className="border-b py-3 px-4 font-medium">Curiosity-Driven</td>
              <td className="border-b py-3 px-4">We fuel creativity and critical thinking — not just rote answers.</td>
            </tr>
            <tr className="hover:bg-muted/20">
              <td className="border-b py-3 px-4 font-medium">Cultural Pride</td>
              <td className="border-b py-3 px-4">We bring India's heroes, stories, and values into everyday learning.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};
