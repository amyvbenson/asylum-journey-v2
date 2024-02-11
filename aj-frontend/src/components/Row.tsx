import { useContext } from "react";
import { DataContext, DataContextType } from "../contexts/dataContext";
import { Category, ServiceSummary, Stage } from "../types/dataTypes";
import "./row.css";
import orderByName from "../utils/orderByName";

interface Props {
  category: Category;
  onClickService: (serviceId: string) => void;
}

export default function Row({ category, onClickService }: Props) {
  const { serviceSummaries, stages } = useContext(
    DataContext
  ) as DataContextType;

  const services = serviceSummaries.filter((service) => {
    return service.categories?.find((catRef) => catRef._ref === category._id);
  });

  if (!services.length) {
    return <p>Nope</p>;
  }

  return (
    <div className="row">
      <h2 className="row__heading">{category.name}</h2>
      {stages.map((stage) => {
        return (
          <Column
            key={stage._id}
            stage={stage}
            serviceSummaries={services}
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
  onClickService: (serviceId: string) => void;
}

function Column({ serviceSummaries, stage, onClickService }: ColumnProps) {
  const services = serviceSummaries.filter((service) =>
    service.stages?.find((stageRef) => stageRef._ref === stage._id)
  );

  return (
    <ul className="column">
      {orderByName(services).map((item) => {
        return (
          <li key={item._id}>
            <button
              className={`service-summary border-${stage._id}`}
              onClick={() => onClickService(item._id)}
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
