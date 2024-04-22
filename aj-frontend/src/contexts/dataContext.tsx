import { FC, ReactNode, createContext, useState } from "react";
import {
  Category,
  Provider,
  Resource,
  ServiceSummary,
  Stage,
} from "../types/dataTypes";

export type DataContextType = {
  categories: Category[];
  providers: Provider[];
  resources: Resource[];
  serviceSummaries: ServiceSummary[];
  stages: Stage[];
  setCategories: (categories: Category[]) => void;
  setProviders: (providers: Provider[]) => void;
  setResources: (resources: Resource[]) => void;
  setServiceSummaries: (serviceSummaries: ServiceSummary[]) => void;
  setStages: (stages: Stage[]) => void;
};

export const DataContext = createContext<DataContextType | null>(null);

const DataProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [providers, setProviders] = useState<Category[]>([]);
  const [stages, setStages] = useState<Category[]>([]);
  const [resources, setResources] = useState<Category[]>([]);
  const [serviceSummaries, setServiceSummaries] = useState<Category[]>([]);

  return (
    <DataContext.Provider
      value={{
        categories,
        providers,
        resources,
        stages,
        serviceSummaries,
        setCategories,
        setProviders,
        setResources,
        setStages,
        setServiceSummaries,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
