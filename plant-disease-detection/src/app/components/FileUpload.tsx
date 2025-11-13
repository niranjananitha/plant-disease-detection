'use client';
import { useRef } from 'react';
import { predictDisease } from '@/lib/modelUtils';
import { PredictionResult } from '@/types1';

const FileUpload = ({
  setResults,
  setLoading
}: {
  setResults: (results: PredictionResult[]) => void;
  setLoading: (loading: boolean) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLoading(true);
      try {
        const imageUrl = URL.createObjectURL(file);
        const predictions = await predictDisease(imageUrl);
        setResults(predictions);
      } catch (error) {
        console.error('Error processing image:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="text-center">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-all"
      >
        Upload Leaf Image
      </button>
      <p className="mt-4 text-gray-600">Supports JPG, PNG, JPEG</p>
    </div>
  );
};

export default FileUpload; // Make sure to use default export