import "./stages.css";
import { Stage } from "../../types/dataTypes";

interface Props {
  stages: Stage[];
}
export default function Stages({ stages }: Props) {
  return (
    <ul className="stages">
      <li className="stages__stage brand"></li>
      {stages.map((stage) => (
        <li className={`stages__stage  bg-${stage._id}`} key={stage._id}>
          {stage.name}
        </li>
      ))}
    </ul>
  );
}
