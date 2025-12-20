import { useState, useEffect } from 'react';

import { getSearchRadius, saveSearchRadius } from '@/helpers/local-storage';

export const useSearchRadius = () => {
  const [radius, setRadius] = useState(20);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  useEffect(() => {
    const loadRadius = async () => {
      try {
        const savedRadius = await getSearchRadius();
        if (savedRadius !== null && savedRadius !== undefined) {
          setRadius(savedRadius);
        }
      } catch (error) {
        console.error('Failed to load search radius from storage:', error);
      }
    };
    loadRadius();
  }, []);

  const handleApplyFilters = async (newRadius: number) => {
    setRadius(newRadius);
    try {
      await saveSearchRadius(newRadius);
    } catch (error) {
      console.error('Failed to save search radius to storage:', error);
    }
  };

  const openFilters = () => setIsFiltersOpen(true);
  const closeFilters = () => setIsFiltersOpen(false);

  return {
    radius,
    isFiltersOpen,
    openFilters,
    closeFilters,
    onApply: handleApplyFilters,
  };
};
