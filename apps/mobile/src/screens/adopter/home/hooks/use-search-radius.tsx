import { useState, useEffect } from 'react';

import { getSearchRadius, saveSearchRadius } from '@/helpers/secure-store';

export const useSearchRadius = () => {
  const [radius, setRadius] = useState(20);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  useEffect(() => {
    const loadRadius = async () => {
      const savedRadius = await getSearchRadius();
      if (savedRadius !== null && savedRadius !== undefined) {
        setRadius(savedRadius);
      }
    };
    loadRadius();
  }, []);

  const handleApplyFilters = async (newRadius: number) => {
    setRadius(newRadius);
    await saveSearchRadius(newRadius);
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
