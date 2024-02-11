import "./stages.css";
import { Stage } from "../../types/dataTypes";

interface Props {
  stages: Stage[];
}
export default function Stages({ stages }: Props) {
  return (
    <ul className="tool-stages">
      <li className="tool-stages__stage brand"></li>
      {stages.map((stage) => (
        <li
          className={`tool-stages__stage tool-stages__${stage._id}`}
          key={stage._id}
        >
          {stage.name}
        </li>
      ))}
    </ul>
  );
}
