// import { useParams, useSearchParams } from "react-router-dom";
import {
  getServiceSummariesQuery,
  getCategoriesQuery,
  getStagesQuery,
  getProvidersQuery,
  getResourcesQuery,
} from "../utils/queryBuilder";
import useFetch from "../hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import { DataContext, DataContextType } from "../contexts/dataContext";
import { Category, ServiceSummary, Stage } from "../types/dataTypes";
import Row from "./Row";
import orderByPosition from "../utils/orderByPosition";
import Filters from "./Filters";
import Stages from "./Stages";
import "./services.css";
import ServiceComponent from "./Service";

export default function Services() {
  // const { slug } = useParams();
  // const [searchParams] = useSearchParams();
  // console.log('searchParams', searchParams.get('stage'))

  const [openService, setOpenService] = useState<string | undefined>(undefined);

  const {
    categories,
    resources,
    providers,
    stages,
    serviceSummaries,
    setServiceSummaries,
    setCategories,
    setProviders,
    setResources,
    setStages,
  } = useContext(DataContext) as DataContextType;

  const {
    loading: loadingServices,
    data: fetchedServices = [] as ServiceSummary[],
  } = useFetch(getServiceSummariesQuery(), !serviceSummaries.length);

  useEffect(() => {
    if (fetchedServices) {
      setServiceSummaries(fetchedServices);
    }
  }, [fetchedServices]);

  const {
    loading: loadingCategories,
    data: fetchedCategories = [] as Category[],
  } = useFetch(getCategoriesQuery(), !categories.length);

  useEffect(() => {
    if (fetchedCategories) {
      setCategories(fetchedCategories);
    }
  }, [fetchedCategories]);

  const { loading: loadingStages, data: fetchedStages = [] as Stage[] } =
    useFetch(getStagesQuery(), !stages.length);

  useEffect(() => {
    if (fetchedStages) {
      setStages(fetchedStages);
    }
  }, [fetchedStages]);

  const { loading: loadingProviders, data: fetchedProviders = [] as Stage[] } =
    useFetch(getProvidersQuery(), !providers.length);

  useEffect(() => {
    if (fetchedProviders) {
      setProviders(fetchedProviders);
    }
  }, [fetchedProviders]);

  const { loading: loadingResources, data: fetchedResources = [] as Stage[] } =
    useFetch(getResourcesQuery(), !resources.length);

  useEffect(() => {
    if (fetchedResources) {
      setResources(fetchedResources);
    }
  }, [fetchedResources]);

  const isLoading =
    loadingCategories ||
    loadingServices ||
    loadingStages ||
    loadingResources ||
    loadingProviders;

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <>
      <div className="tool">
        <Filters />

        <Stages />

        {orderByPosition(categories)?.map((category) => {
          return (
            <Row
              key={category._id}
              category={category}
              onClickService={(serviceId) => setOpenService(serviceId)}
            />
          );
        })}
      </div>

      {openService && (
        <ServiceComponent
          id={openService}
          onClose={() => setOpenService(undefined)}
        />
      )}
    </>
  );
}
