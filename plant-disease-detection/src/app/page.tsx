// app/page.tsx
'use client'; // Add this at the top for App Router
import { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import CameraCapture from '@/components/CameraCapture';
import ResultsDisplay from '@/components/ResultsDisplay';
import Loader from '@/components/Loader';
import { PredictionResult } from '@/types';

export default function Home() {
  const [results, setResults] = useState<PredictionResult[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-green-800 mb-8">
          Plant Disease Detector 🌿
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <FileUpload setResults={setResults} setLoading={setLoading} />
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <CameraCapture setResults={setResults} setLoading={setLoading} />
          </div>
        </div>

        {loading && <Loader />}
        {results.length > 0 && <ResultsDisplay results={results} />}
      </div>
    </main>
  );
}