import { useState, useEffect, useRef } from 'react';

import { getSearchRadius, saveSearchRadius } from '@/helpers/local-storage';

export const DEFAULT_RADIUS = 20;

export const useSearchRadius = () => {
  const [radius, setRadius] = useState(DEFAULT_RADIUS);
  const radiusRef = useRef(radius);

  useEffect(() => {
    const loadRadius = async () => {
      try {
        const savedRadius = await getSearchRadius();
        if (savedRadius !== null && savedRadius !== undefined) {
          setRadius(savedRadius);
          radiusRef.current = savedRadius;
        }
      } catch (error) {
        console.error('Failed to load search radius from storage:', error);
      }
    };
    loadRadius();
  }, []);

  const saveRadius = async () => {
    setRadius(radiusRef.current);
    try {
      await saveSearchRadius(radiusRef.current);
    } catch (error) {
      console.error('Failed to save search radius to storage:', error);
    }
  };

  const changeRadius = (newRadius: number) => {
    radiusRef.current = newRadius;
  };

  const isApplied = radius !== DEFAULT_RADIUS;

  return {
    value: radius,
    isApplied,
    save: saveRadius,
    change: changeRadius,
  };
};
