// src/components/ui/toaster.tsx
'use client';

import { Toaster as SonnerToaster } from 'sonner';

export function Toaster() {
  return (
    <SonnerToaster 
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast: 'bg-white border border-gray-200 shadow-lg',
          title: 'text-green-800 font-medium',
          description: 'text-gray-600',
          actionButton: 'bg-green-600 text-white',
          closeButton: 'text-gray-400 hover:text-green-600'
        }
      }}
    />
  );
}