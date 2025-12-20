import { useState } from 'react';

type PetFilter = {
  value: any;
  isApplied: boolean;
  save: () => Promise<void>;
};

export const useFilters = ({ filters }: { filters: PetFilter[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const apply = async () => {
    await Promise.all(filters.map((filter) => filter.save()));
  };

  const getAppliedFiltersCount = () => {
    let count = 0;

    filters.forEach((filter) => {
      if (filter.isApplied) {
        count++;
      }
    });

    return count;
  };

  return {
    isOpen,
    open,
    close,
    apply,
    appliedCount: getAppliedFiltersCount(),
  };
};
