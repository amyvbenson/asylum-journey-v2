import { useContext } from "react";
import { DataContext, DataContextType } from "../../contexts/dataContext";
import { Category, ServiceSummary, Stage } from "../../types/dataTypes";
import "./row.css";

interface Props {
  category: Category;
  filteredProviderIds: string[];
  filteredResourceIds: string[];
  stages: Stage[];
  onClickService: (serviceId: string) => void;
}

export default function Row({
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
    <div className="row">
      <h2 className="row__heading">{category.name}</h2>
      {stages.map((stage) => {
        return (
          <Column
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

interface ColumnProps {
  serviceSummaries: ServiceSummary[];
  stage: Stage;
  onClickService: (slug: string) => void;
}

function Column({ serviceSummaries, stage, onClickService }: ColumnProps) {
  const services = serviceSummaries.filter((service) =>
    service.stages?.find((stageRef) => stageRef._ref === stage._id)
  );

  return (
    <ul className="column">
      {services.map((item) => {
        return (
          <li key={item._id}>
            <button
              className={`service-summary border-${stage._id}`}
              onClick={() => onClickService(item.slug.current)}
              type="button"
            >
              {item.name}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
