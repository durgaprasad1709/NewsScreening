import React, { createContext, ReactNode, useMemo, useState } from 'react';
import { JsonResponse } from '../types';
import { initialFormValues } from '../utils';

interface DashboardContextType {
  bulkUploadData: JsonResponse[];
  setBulkUploadData: React.Dispatch<React.SetStateAction<JsonResponse[]>>;
  entityData: JsonResponse;
  setEntityData: React.Dispatch<React.SetStateAction<JsonResponse>>;
  isFetching: boolean;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined,
);

export const DashboardContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [bulkUploadData, setBulkUploadData] = useState<JsonResponse[]>([]);
  const [entityData, setEntityData] = useState<JsonResponse>({
    entityInfo: initialFormValues,
    articles: [],
    'keywords-data-agg': [],
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
    [bulkUploadData, entityData, isFetching, setIsFetching],
  );

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
