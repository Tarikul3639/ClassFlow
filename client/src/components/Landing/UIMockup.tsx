
import React from 'react';

const UIMockup: React.FC = () => {
  return (
    <div className="mt-16 sm:mt-20 relative max-w-5xl mx-auto px-4">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white border border-neutral-border aspect-[16/9] sm:aspect-[2/1] group">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white z-0"></div>
        <div className="absolute top-8 left-8 right-8 bottom-0 bg-white rounded-t-xl shadow-inner border-t border-l border-r border-gray-100 flex flex-col overflow-hidden">
          <div className="h-12 border-b border-gray-100 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
          </div>
          <div className="flex-1 p-6 grid grid-cols-3 gap-4 bg-gray-50/50">
            <div className="col-span-2 space-y-3">
              <div className="h-24 bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                <div className="h-4 w-1/3 bg-gray-100 rounded mb-2"></div>
                <div className="h-2 w-2/3 bg-gray-50 rounded"></div>
              </div>
              <div className="h-24 bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                <div className="h-4 w-1/4 bg-gray-100 rounded mb-2"></div>
                <div className="h-2 w-1/2 bg-gray-50 rounded"></div>
              </div>
            </div>
            <div className="col-span-1 space-y-3">
              <div className="h-48 bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin mb-3"></div>
                <div className="h-3 w-12 bg-gray-100 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="inline-block bg-black/75 text-white text-xs px-2 py-1 rounded">Dashboard Preview</span>
        </div>
      </div>
    </div>
  );
};

export default UIMockup;
