import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-converter';

declare module '@tensorflow/tfjs' {
  interface Tensor {
    dispose(): void;
  }
}