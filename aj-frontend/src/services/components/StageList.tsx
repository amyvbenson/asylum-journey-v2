import { ServiceSummary, Stage } from "../../types/dataTypes";
import "./stageList.css";

interface Props {
  serviceSummaries: ServiceSummary[];
  stage: Stage;
  onClickService: (slug: string) => void;
}

export default function StageList({
  serviceSummaries,
  stage,
  onClickService,
}: Props) {
  const services = serviceSummaries.filter((service) =>
    service.stages?.find((stageRef) => stageRef._ref === stage._id)
  );

  return (
    <ul className="stage-list">
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
