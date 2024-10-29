import React, { createContext, ReactNode, useMemo, useState } from 'react';
import { EntityData, SearchFormData } from '../types';

interface DashboardContextType {
  bulkUploadData: SearchFormData[];
  setBulkUploadData: React.Dispatch<React.SetStateAction<SearchFormData[]>>;
  entityData: EntityData;
  setEntityData: React.Dispatch<React.SetStateAction<EntityData>>;
  isFetching: boolean;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined,
);

export const DashboardContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [bulkUploadData, setBulkUploadData] = useState<SearchFormData[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [entityData, setEntityData] = useState<EntityData>({
    entityInfo: {
      name: '',
      country: '',
      domain: '',
      fromDate: new Date(),
      endDate: new Date(),
      numberOfURLs: '',
    },
    articles: [],
  });

  const value = useMemo(
    () => ({
      bulkUploadData,
      setBulkUploadData,
      entityData,
      setEntityData,
      isFetching,
      setIsFetching,
    }),
    [bulkUploadData, entityData, isFetching],
  );

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
