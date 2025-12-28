import { create } from 'zustand';

type NewRequestsStore = {
  hasNewRequests: boolean;
  setHasNewRequests: (value: boolean) => void;
};

export const useNewRequestsStore = create<NewRequestsStore>((set) => ({
  hasNewRequests: false,
  setHasNewRequests: (value) => set({ hasNewRequests: value }),
}));
