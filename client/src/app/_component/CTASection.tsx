"use client";
import {
  CircleCheckBig,
  CalendarCheck,
  User,
  CloudLightning,
} from "lucide-react";
import Link from "next/link";

export const CTASection: React.FC = () => {
  return (
    <section className="py-24 bg-white overflow-hidden relative">
      <div className="absolute right-0 top-0 w-1/3 h-full bg-linear-to-l from-primary/5 to-transparent skew-x-12 transform origin-top-right"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-text-main">
              Ready to streamline your <br /> academic workflow?
            </h2>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <CircleCheckBig size={20} className="text-primary" />
                <span className="text-text-main">
                  Real-time schedule updates
                </span>
              </li>
              <li className="flex items-center gap-3">
                <CircleCheckBig size={20} className="text-primary" />
                <span className="text-text-main">
                  Integrated resource sharing
                </span>
              </li>
              <li className="flex items-center gap-3">
                <CircleCheckBig size={20} className="text-primary" />
                <span className="text-text-main">
                  Mobile-friendly interface
                </span>
              </li>
            </ul>
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center h-12 px-8 bg-text-main text-white hover:bg-black text-base font-bold rounded-full transition-colors"
            >
              Get Started Now
            </Link>
          </div>
          <div className="flex-1 w-full max-w-md lg:max-w-full">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 mt-8">
                <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 transform translate-y-4">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-3">
                    <CircleCheckBig size={18} />
                  </div>
                  <div className="h-2 w-16 bg-gray-200 rounded mb-2"></div>
                  <div className="h-2 w-full bg-gray-100 rounded"></div>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-3">
                    <CalendarCheck size={18} />
                  </div>
                  <div className="h-2 w-20 bg-gray-200 rounded mb-2"></div>
                  <div className="h-2 w-3/4 bg-gray-100 rounded"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-primary flex items-center justify-center mb-3">
                    <User size={18} />
                  </div>
                  <div className="h-2 w-12 bg-gray-200 rounded mb-2"></div>
                  <div className="h-2 w-full bg-gray-100 rounded"></div>
                  <div className="h-2 w-1/2 bg-gray-100 rounded mt-1"></div>
                </div>
                <div className="bg-primary p-4 rounded-2xl shadow-lg transform -translate-y-4 text-white">
                  <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center mb-3">
                    <CloudLightning size={18} />
                  </div>
                  <div className="h-2 w-16 bg-white/40 rounded mb-2"></div>
                  <div className="h-2 w-full bg-white/20 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};