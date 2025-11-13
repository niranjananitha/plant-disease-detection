'use client';
import { PredictionResult } from '@/types1';

interface ResultsDisplayProps {
  results: PredictionResult[];
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  const primaryDiagnosis = results[0];
  
  // Disease information database
  const getDiseaseInfo = (disease: string) => {
    const info: { [key: string]: { 
      description: string; 
      prevention: string[];
      treatment: string[];
    } } = {
      'Healthy': {
        description: 'Your plant shows no signs of disease. Maintain optimal growing conditions.',
        prevention: [
          'Continue regular watering schedule',
          'Ensure proper sunlight exposure',
          'Monitor for pest activity'
        ],
        treatment: ['No treatment needed']
      },
      'Powdery Mildew': {
        description: 'Fungal disease appearing as white powdery spots on leaves',
        prevention: [
          'Improve air circulation',
          'Avoid overhead watering',
          'Use resistant plant varieties'
        ],
        treatment: [
          'Apply neem oil solution',
          'Use sulfur-based fungicides',
          'Remove infected leaves'
        ]
      },
      'Leaf Spot': {
        description: 'Circular brown or black spots caused by fungal/bacterial infection',
        prevention: [
          'Water at soil level',
          'Space plants properly',
          'Disinfect gardening tools'
        ],
        treatment: [
          'Apply copper fungicide',
          'Remove affected leaves',
          'Improve drainage'
        ]
      }
    };

    return info[disease] || {
      description: 'General plant care recommended',
      prevention: ['Maintain proper growing conditions'],
      treatment: ['Consult with agricultural expert']
    };
  };

  const diseaseInfo = getDiseaseInfo(primaryDiagnosis.className);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold text-green-800 mb-6">
        Diagnosis Results 🌱
      </h2>

      {/* Primary Diagnosis */}
      <div className="bg-green-50 rounded-lg p-4 mb-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-green-800">
            {primaryDiagnosis.className}
          </h3>
          <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
            {primaryDiagnosis.probability}% Confidence
          </span>
        </div>
        <div className="w-full bg-green-100 rounded-full h-2.5">
          <div 
            className="bg-green-600 h-2.5 rounded-full transition-all duration-500" 
            style={{ width: `${primaryDiagnosis.probability}%` }}
          />
        </div>
      </div>

      {/* Disease Information */}
      <div className="space-y-6">
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-medium text-green-800 mb-2">Description</h4>
          <p className="text-gray-600">{diseaseInfo.description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">Prevention Tips</h4>
            <ul className="list-disc list-inside space-y-2">
              {diseaseInfo.prevention.map((tip, index) => (
                <li key={index} className="text-gray-600">{tip}</li>
              ))}
            </ul>
          </div>

          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">Treatment Options</h4>
            <ul className="list-disc list-inside space-y-2">
              {diseaseInfo.treatment.map((option, index) => (
                <li key={index} className="text-gray-600">{option}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Other Possible Conditions */}
        {results.length > 1 && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-800 mb-3">Other Possibilities</h4>
            <div className="space-y-2">
              {results.slice(1).map((result, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-600">{result.className}</span>
                  <span className="text-gray-500 text-sm">{result.probability}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}