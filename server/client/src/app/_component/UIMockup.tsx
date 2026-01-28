import React from "react";

export const UIMockup: React.FC = () => {
  return (
    <div className="mt-16 my-10 relative max-w-5xl mx-auto px-4">
      <div className="relative rounded-2xl overflow-hidden shadow-xl bg-white border border-neutral-border group">

        {/* window content */}
        <div className="rounded-t-xl shadow-inner border-t border-l border-r border-gray-100 flex flex-col overflow-hidden p-4 sm:p-6">
          
          {/* header bar */}
          <div className="h-20 sm:h-12 border-b border-gray-100 flex items-center px-3 sm:px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
            <div className="w-3 h-3 rounded-full bg-green-400/80" />
          </div>

          {/* content */}
          <div className="flex-1 mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-gray-50/50 p-2 sm:p-4 rounded-lg">
            
            {/* left section */}
            <div className="space-y-3 md:col-span-2">
              <div className="h-20 sm:h-24 bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                <div className="h-4 w-1/3 bg-gray-100 rounded mb-2" />
                <div className="h-2 w-2/3 bg-gray-50 rounded" />
              </div>
              <div className="h-20 sm:h-24 bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                <div className="h-4 w-1/4 bg-gray-100 rounded mb-2" />
                <div className="h-2 w-1/2 bg-gray-50 rounded" />
              </div>
            </div>

            {/* right section */}
            <div className="space-y-3">
              <div className="h-32 sm:h-48 bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex flex-col items-center justify-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin mb-3" />
                <div className="h-3 w-12 bg-gray-100 rounded" />
              </div>
            </div>
          </div>

          {/* hover label */}
          <div className="mt-4 text-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
            <span className="inline-block bg-black/75 text-white text-xs px-2 py-1 rounded">
              Dashboard Preview
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};
