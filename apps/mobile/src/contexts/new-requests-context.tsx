import React, { createContext, useContext, useState, ReactNode } from 'react';

type NewRequestsContextType = {
  hasNewRequests: boolean;
  setHasNewRequests: (value: boolean) => void;
};

const NewRequestsContext = createContext<NewRequestsContextType | undefined>(undefined);

export const NewRequestsProvider = ({ children }: { children: ReactNode }) => {
  const [hasNewRequests, setHasNewRequests] = useState(false);

  return (
    <NewRequestsContext.Provider value={{ hasNewRequests, setHasNewRequests }}>
      {children}
    </NewRequestsContext.Provider>
  );
};

export const useNewRequests = () => {
  const context = useContext(NewRequestsContext);
  if (!context) {
    throw new Error('useNewRequests must be used within NewRequestsProvider');
  }
  return context;
};
