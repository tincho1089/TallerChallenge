import React, { createContext, useState, useContext, ReactNode } from 'react';

type Filter = 'all' | 'active' | 'completed';

interface FilterContextProps {
  filter: Filter;
  setFilter: (filter: Filter) => void;
}

export const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filter, setFilter] = useState<Filter>('all');

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilterContext must be used within a FilterProvider');
  }
  return context;
};
