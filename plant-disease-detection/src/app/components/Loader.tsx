'use client';

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      {/* Spinner Container */}
      <div className="relative">
        {/* Outer Circle */}
        <div className="h-12 w-12 rounded-full border-4 border-green-200"></div>
        
        {/* Spinning Arc */}
        <div className="absolute left-0 top-0 h-12 w-12 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>
        
        {/* Center Dot */}
        <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-green-600"></div>
      </div>

      {/* Loading Text */}
      <p className="text-sm font-medium text-green-600 animate-pulse">
        Analyzing Plant Health...
      </p>
    </div>
  );
}