// app/lib/modelUtils.ts
import * as tf from '@tensorflow/tfjs';
import type { Tensor, LayersModel } from '@tensorflow/tfjs';
import { PredictionResult } from '@/types1'; // Ensure this path is correct

// Initialize model cache
let model: LayersModel | null = null;

const CLASS_NAMES = ['Healthy', 'Powdery Mildew', 'Leaf Spot'];

// Preprocess image to model input format
const preprocessImage = (image: HTMLImageElement): tf.Tensor => {
  return tf.tidy(() => {
    return tf.browser.fromPixels(image)
      .resizeNearestNeighbor([224, 224])
      .toFloat()
      .div(255.0)
      .expandDims();
  });
};

export async function loadModel(): Promise<LayersModel> {
  if (model) return model;
  
  try {
    // ✅ Fixed model path
    const modelUrl = `${window.location.origin}/assets/model.json`;
    console.log(`Loading model from: ${modelUrl}`);
    
    model = await tf.loadLayersModel(modelUrl);
    console.log('Model loaded successfully');
    return model;
  } catch (error) {
    let errorMessage = 'Failed to load model';
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    console.error('Model loading failed:', error);
    throw new Error(`Model loading failed: ${errorMessage}`);
  }
}

export async function predictDisease(imageUrl: string): Promise<PredictionResult[]> {
  try {
    const model = await loadModel();
    const image = await loadImage(imageUrl);
    
    const tensor = preprocessImage(image);
    const prediction = model.predict(tensor) as Tensor;
    
    const results = Array.from(prediction.dataSync());
    const sortedPredictions = processResults(results);
    
    tf.dispose([tensor, prediction]);
    
    return sortedPredictions;
  } catch (error) {
    let errorMessage = 'Prediction failed';
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    console.error('Prediction failed:', error);
    throw new Error(`${errorMessage}`);
  }
}

// Helper function to load image
async function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = url;

    image.onload = () => resolve(image);
    image.onerror = (event: Event | string) => {
      if (typeof event === 'string') {
        reject(new Error(`Image load failed: ${event}`));
      } else {
        const errorEvent = event as ErrorEvent;
        const message = errorEvent.message || 
                       (errorEvent.target ? `Failed to load image from ${url}` : 'Unknown image error');
        reject(new Error(`Image load failed: ${message}`));
      }
    };
  });
}

// Process and sort results
function processResults(results: number[]): PredictionResult[] {
  return results
    .map((prob, index) => ({
      className: CLASS_NAMES[index],
      probability: Number((prob * 100).toFixed(2))
    }))
    .sort((a, b) => b.probability - a.probability);
}
