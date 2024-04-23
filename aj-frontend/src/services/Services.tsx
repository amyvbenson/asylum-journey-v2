import {
  getServiceSummariesQuery,
  getCategoriesQuery,
  getStagesQuery,
  getProvidersQuery,
  getResourcesQuery,
} from "../utils/queryBuilder";
import useFetch from "../hooks/useFetch";
import { DataContext, DataContextType } from "../contexts/dataContext";
import {
  Category,
  Provider,
  Resource,
  ServiceSummary,
  Stage,
} from "../types/dataTypes";
import Row from "./components/Row";
import Filters from "./components/Filters";
import Stages from "./components/Stages";
import "./services.css";
import ServiceDialog from "../service/ServiceDialog";
import SearchDialog from "./components/SearchDialog";
import ProviderDialog from "../provider/ProviderDialog";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "../components/Loader";

export default function Services() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedStages = searchParams.get("stages");
  const selectedCategories = searchParams.get("categories");
  const selectedProviders = searchParams.get("providers");
  const selectedResources = searchParams.get("resources");
  const searchTerm = searchParams.get("q");
  const selectedService = searchParams.get("service");
  const selectedProvider = searchParams.get("provider");

  const [showProviderDialog, setShowProviderDialog] = useState<string>();
  const [showServiceDialog, setShowServiceDialog] = useState<
    string | undefined
  >(undefined);
  const [showSearchDialog, setShowSearchDialog] = useState<string>();

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
  }, [fetchedServices, setServiceSummaries]);

  const {
    loading: loadingCategories,
    data: fetchedCategories = [] as Category[],
  } = useFetch(getCategoriesQuery(), !categories.length);

  useEffect(() => {
    if (fetchedCategories) {
      setCategories(fetchedCategories);
      setFilteredCategories(fetchedCategories);
    }
  }, [fetchedCategories, setCategories]);

  const { loading: loadingStages, data: fetchedStages = [] as Stage[] } =
    useFetch(getStagesQuery(), !stages.length);

  useEffect(() => {
    if (fetchedStages) {
      setStages(fetchedStages);
      setFilteredStages(fetchedStages);
    }
  }, [fetchedStages, setStages]);

  const {
    loading: loadingProviders,
    data: fetchedProviders = [] as Provider[],
  } = useFetch(getProvidersQuery(), !providers.length);

  useEffect(() => {
    if (fetchedProviders) {
      setProviders(fetchedProviders);
    }
  }, [fetchedProviders, setProviders]);

  const {
    loading: loadingResources,
    data: fetchedResources = [] as Resource[],
  } = useFetch(getResourcesQuery(), !resources.length);

  useEffect(() => {
    if (fetchedResources) {
      setResources(fetchedResources);
    }
  }, [fetchedResources, setResources]);

  useEffect(() => {
    setFilteredStages(
      selectedStages
        ? stages.filter((stage) =>
            selectedStages.split(",").includes(stage._id)
          )
        : stages
    );
  }, [selectedStages, stages, setFilteredStages]);

  useEffect(() => {
    setFilteredCategories(
      selectedCategories
        ? categories.filter((category) =>
            selectedCategories.split(",").includes(category._id)
          )
        : categories
    );
  }, [selectedCategories, categories, setFilteredCategories]);

  useEffect(() => {
    setFilteredProviderIds(
      selectedProviders ? selectedProviders.split(",") : []
    );
  }, [selectedProviders, setFilteredProviderIds]);

  useEffect(() => {
    setFilteredResourceIds(
      selectedResources ? selectedResources.split(",") : []
    );
  }, [selectedResources, setFilteredResourceIds]);

  useEffect(() => {
    setShowProviderDialog(selectedProvider ? selectedProvider : undefined);
    setShowSearchDialog(searchTerm ? searchTerm : undefined);
    setShowServiceDialog(selectedService ? selectedService : undefined);
  }, [selectedProvider, searchTerm, selectedService]);

  const isLoading =
    loadingCategories ||
    loadingServices ||
    loadingStages ||
    loadingResources ||
    loadingProviders;

  return (
    <main>
      <div className="tool">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Filters />

            <Stages stages={filteredStages} />

            {filteredCategories.map((category) => {
              return (
                <Row
                  key={category._id}
                  category={category}
                  filteredProviderIds={filteredProviderIds}
                  filteredResourceIds={filteredResourceIds}
                  stages={filteredStages}
                  onClickService={(slug) =>
                    setSearchParams(() => {
                      searchParams.set("service", slug);
                      return searchParams;
                    })
                  }
                />
              );
            })}
          </>
        )}
      </div>

      {!!showProviderDialog && <ProviderDialog id={showProviderDialog} />}

      {!!showServiceDialog && <ServiceDialog slug={showServiceDialog} />}

      {!!showSearchDialog && <SearchDialog searchTerm={showSearchDialog} />}
    </main>
  );
}
