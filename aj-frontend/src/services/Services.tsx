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
import Row from "./components/Row";
import orderByPosition from "../utils/orderByPosition";
import Filters from "./components/Filters";
import Stages from "./components/Stages";
import "./services.css";
import ServiceComponent from "../service/Service";

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
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [filteredProviderIds, setFilteredProviderIds] = useState<string[]>([]);
  const [filteredResourceIds, setFilteredResourceIds] = useState<string[]>([]);
  const [filteredStages, setFilteredStages] = useState<Stage[]>([]);

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
      setFilteredCategories(fetchedCategories);
    }
  }, [fetchedCategories]);

  const { loading: loadingStages, data: fetchedStages = [] as Stage[] } =
    useFetch(getStagesQuery(), !stages.length);

  useEffect(() => {
    if (fetchedStages) {
      setStages(fetchedStages);
      setFilteredStages(fetchedStages);
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

  function handleFilterCategories(selectedCategories: string[]) {
    selectedCategories.length
      ? setFilteredCategories(
          categories.filter((category) =>
            selectedCategories.includes(category._id)
          )
        )
      : setFilteredCategories(categories);
  }

  function handleFilterProviders(selectedProviders: string[]) {
    selectedProviders.length
      ? setFilteredProviderIds(selectedProviders)
      : setFilteredProviderIds([]);
  }

  function handleFilterResources(selectedResources: string[]) {
    selectedResources.length
      ? setFilteredResourceIds(selectedResources)
      : setFilteredResourceIds([]);
  }

  function handleFilterStages(selectedStages: string[]) {
    selectedStages.length
      ? setFilteredStages(
          stages.filter((stage) => selectedStages.includes(stage._id))
        )
      : setFilteredStages(stages);
  }

  function handleShowAll() {
    setFilteredCategories(categories);
    setFilteredProviderIds([]);
    setFilteredResourceIds([]);
    setFilteredStages(stages);
  }

  return (
    <main>
      <div className="tool">
        {isLoading ? (
          <div className="loader">
            <img src="/public/loader-logo.svg" alt="" />
            Loading...
          </div>
        ) : (
          <>
            <Filters
              onFilterCategories={handleFilterCategories}
              onFilterProviders={handleFilterProviders}
              onFilterResources={handleFilterResources}
              onFilterStages={handleFilterStages}
              onShowAll={handleShowAll}
            />

            <Stages stages={filteredStages} />

            {orderByPosition(filteredCategories)?.map((category) => {
              return (
                <Row
                  key={category._id}
                  category={category}
                  filteredProviderIds={filteredProviderIds}
                  filteredResourceIds={filteredResourceIds}
                  stages={filteredStages}
                  onClickService={(serviceId) => setOpenService(serviceId)}
                />
              );
            })}
          </>
        )}
      </div>

      {openService && (
        <ServiceComponent
          id={openService}
          onClose={() => setOpenService(undefined)}
        />
      )}
    </main>
  );
}
