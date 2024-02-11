import { useContext } from "react";
import { DataContext, DataContextType } from "../contexts/dataContext";

// multi select https://ariakit.org/examples/select-multiple
// also has dialog for service modal

export default function Filters() {
  const { categories, providers, resources, stages } = useContext(
    DataContext
  ) as DataContextType;

  return (
    <div>
      {stages.length > 0 && (
        <select multiple>
          {stages.map((stage) => (
            <option key={stage._id} value={stage._id}>
              {stage.name}
            </option>
          ))}
        </select>
      )}

      {categories.length > 0 && (
        <select multiple>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      )}

      {providers.length > 0 && (
        <select multiple>
          {providers.map((provider) => (
            <option key={provider._id} value={provider._id}>
              {provider.name}
            </option>
          ))}
        </select>
      )}

      {resources.length > 0 && (
        <select multiple>
          {resources.map((resource) => (
            <option key={resource._id} value={resource._id}>
              {resource.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
