import { useState, useEffect, useCallback } from 'react';

interface LuminanceResult {
  ready: boolean;
  luminance: number | null;
  isBright: boolean;
}

/**
 * Custom hook that samples an image's average luminance using offscreen canvas
 * @param imagePath - Path to the image to analyze
 * @param threshold - Luminance threshold to determine if image is bright (0-255, default: 128)
 * @returns Object with ready state, luminance value, and isBright helper
 */
export const useImageLuminance = (imagePath: string, threshold: number = 128): LuminanceResult => {
  const [ready, setReady] = useState(false);
  const [luminance, setLuminance] = useState<number | null>(null);

  const calculateLuminance = useCallback(async (path: string) => {
    try {
      // Create image element
      const img = new Image();
      
      // Handle CORS by setting crossOrigin if needed
      if (!path.startsWith('/') && !path.startsWith('./') && !path.startsWith('../')) {
        img.crossOrigin = 'anonymous';
      }

      // Wait for image to load
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = path;
      });

      // Create offscreen canvas
      const canvas = new OffscreenCanvas(img.width, img.height);
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Failed to get canvas context');
      }

      // Draw image to canvas
      ctx.drawImage(img, 0, 0);

      // Get image data
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const data = imageData.data;

      // Calculate average luminance using relative luminance formula
      // Y = 0.299*R + 0.587*G + 0.114*B
      let totalLuminance = 0;
      const pixelCount = data.length / 4; // 4 values per pixel (RGBA)

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        // Skip alpha channel (data[i + 3])
        
        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
        totalLuminance += luminance;
      }

      const averageLuminance = totalLuminance / pixelCount;
      
      setLuminance(averageLuminance);
      setReady(true);
      
    } catch (error) {
      console.warn('Failed to calculate image luminance:', error);
      // Gracefully handle CORS or other failures by returning null
      setLuminance(null);
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (imagePath) {
      setReady(false);
      setLuminance(null);
      calculateLuminance(imagePath);
    }
  }, [imagePath, calculateLuminance]);

  const isBright = luminance !== null ? luminance > threshold : false;

  return {
    ready,
    luminance,
    isBright
  };
};