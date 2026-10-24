import React from 'react';

export default function About({ data }) {
  if (!data || (!data.title && !data.description)) return null;

  return (
    <section id="about" className="scroll-mt-20 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-10 mb-6 text-center">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f2444] mb-3.5 tracking-tight">
        {data.title}
      </h2>
      <p className="max-w-3xl mx-auto text-sm sm:text-base text-gray-700 leading-relaxed font-medium">
        {data.description}
      </p>
    </section>
  );
}
