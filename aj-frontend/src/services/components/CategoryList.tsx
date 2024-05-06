import { useContext } from "react";
import { DataContext, DataContextType } from "../../contexts/dataContext";
import { Category, ServiceSummary, Stage } from "../../types/dataTypes";
import "./categoryList.css";
import StageList from "./StageList";

interface Props {
  category: Category;
  filteredProviderIds: string[];
  filteredResourceIds: string[];
  stages: Stage[];
  onClickService: (serviceId: string) => void;
}

export default function CategoryList({
  category,
  filteredProviderIds = [],
  filteredResourceIds = [],
  stages,
  onClickService,
}: Props) {
  const { serviceSummaries } = useContext(DataContext) as DataContextType;

  function filterByProviders(service: ServiceSummary) {
    return filteredProviderIds.length
      ? service.providers?.some((provider) =>
          filteredProviderIds.includes(provider._id)
        )
      : true;
  }
  function filterByResources(service: ServiceSummary) {
    return filteredResourceIds.length
      ? service.resources?.some((resource) =>
          filteredResourceIds.includes(resource._id)
        )
      : true;
  }

  const filteredServiceSummaries = serviceSummaries.filter((service) => {
    if (service.categories?.find((catRef) => catRef._ref === category._id)) {
      return filterByProviders(service) && filterByResources(service);
    }
  });

  return (
    <div className="categoryList">
      <h2 className="categoryList__heading">{category.name}</h2>
      {stages.map((stage) => {
        return (
          <StageList
            key={stage._id}
            stage={stage}
            serviceSummaries={filteredServiceSummaries}
            onClickService={onClickService}
          />
        );
      })}
    </div>
  );
}
