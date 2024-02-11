import { useContext } from "react";
import { DataContext, DataContextType } from "../contexts/dataContext";
import "./stages.css";

export default function Stages() {
  const { stages } = useContext(DataContext) as DataContextType;

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
