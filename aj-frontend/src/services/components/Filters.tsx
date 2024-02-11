import { DataContext, DataContextType } from "../../contexts/dataContext";
import FilterSelect from "./FilterSelect";
import "./filters.css";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  onFilterCategories: (categories: string[]) => void;
  onFilterProviders: (providers: string[]) => void;
  onFilterResources: (resources: string[]) => void;
  onFilterStages: (stages: string[]) => void;
  onShowAll: () => void;
}

export default function Filters({
  onFilterCategories,
  onFilterProviders,
  onFilterResources,
  onFilterStages,
  onShowAll,
}: Props) {
  const { categories, providers, resources, stages } = useContext(
    DataContext
  ) as DataContextType;

  const [resetFilters, toggleResetFilters] = useState<boolean>(false);

  return (
    <div className="filter-bar">
      <div className="filter-bar__primary">
        <div className="filter-bar__logo">
          <h1>
            <Link to="../" className="logo">
              <img src="../public/logo-basic.png" alt="The Asylum Journey" />
            </Link>
          </h1>
        </div>
        <div className="filter-bar__section">
          <FilterSelect
            label="Stages"
            options={stages}
            reset={resetFilters}
            selectAllLabel="Show all stages"
            onChange={(stages) => {
              onFilterStages(stages);
              toggleResetFilters(false);
            }}
          />
        </div>
        <div className="filter-bar__section">
          <FilterSelect
            label="Categories"
            options={categories}
            reset={resetFilters}
            selectAllLabel="Show all categories"
            onChange={(categories) => {
              onFilterCategories(categories);
              toggleResetFilters(false);
            }}
          />
        </div>
        <div className="filter-bar__section">
          <FilterSelect
            label="Providers"
            modal
            options={providers}
            reset={resetFilters}
            selectAllLabel="Show all providers"
            onChange={(providers) => {
              onFilterProviders(providers);
              toggleResetFilters(false);
            }}
          />
        </div>
        <div className="filter-bar__section">
          <FilterSelect
            label="Resources"
            options={resources}
            reset={resetFilters}
            selectAllLabel="Show all resources"
            onChange={(resources) => {
              onFilterResources(resources);
              toggleResetFilters(false);
            }}
          />
        </div>

        <button
          className="filter__toggle-button"
          onClick={() => {
            toggleResetFilters(true);
            onShowAll();
          }}
          type="button"
        >
          Show all
        </button>
      </div>

      {/* 
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
      )} */}
    </div>
  );
}
