import { DataContext, DataContextType } from "../../contexts/dataContext";
import FilterSelect from "./FilterSelect";
import FilterSearch from "./FilterSearch";
import InfoDialog from "./InfoDialog";
import "./filters.css";
import { useDesktopMedia } from "../../hooks/useMedia";
import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function Filters() {
  const { categories, providers, resources, stages } = useContext(
    DataContext
  ) as DataContextType;

  const { isMedia: isDesktopMedia } = useDesktopMedia();

  const [searchParams, setSearchParams] = useSearchParams();

  const [showFilters, setShowFilters] = useState<boolean>(true);

  const [showSecondaryOptions, setShowSecondaryOptions] =
    useState<boolean>(false);

  const [showInfoDialog, setShowInfoDialog] = useState<boolean>(false);

  useEffect(() => {
    setShowFilters(isDesktopMedia);
  }, [isDesktopMedia]);

  const orderedCategories = categories.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  return (
    <>
      <div className={`filter-bar print-hidden ${showFilters ? "active" : ""}`}>
        <h1 className="filter-bar-logo">
          <Link to="../" className="filter-bar-logo__link">
            <img src="../logo-basic.png" alt="The Asylum Journey" />
          </Link>
        </h1>

        {!isDesktopMedia && (
          <button
            aria-controls="filters"
            aria-expanded={showFilters}
            className={`button-transparent filter-bar__mobile-btn button-arrow ${
              showFilters ? "active" : ""
            }`}
            onClick={() => setShowFilters(!showFilters)}
            type="button"
          >
            Filter services
          </button>
        )}

        <div className="filter-bar__inner" hidden={!showFilters} id="filters">
          <div className="filter-bar__primary">
            <div className="filter-bar__section">
              <FilterSelect
                label="Stages"
                name="stages"
                options={stages}
                selectAllLabel="Show all stages"
              />
            </div>
            <div className="filter-bar__section">
              <FilterSelect
                label="Categories"
                name="categories"
                options={orderedCategories}
                selectAllLabel="Show all categories"
              />
            </div>
            <div className="filter-bar__section">
              <FilterSelect
                combobox
                label="Providers"
                name="providers"
                options={providers}
                selectAllLabel="Show all providers"
                onClickView={(id) => {
                  setSearchParams(() => {
                    searchParams.set("provider", id);
                    return searchParams;
                  });
                }}
              />
            </div>
            <div className="filter-bar__section">
              <FilterSearch />
            </div>

            {isDesktopMedia && (
              <>
                <button
                  className="button-outline filter-bar__button"
                  onClick={() => {
                    setSearchParams({});
                  }}
                  type="button"
                >
                  Show all
                </button>
                <button
                  aria-controls="filters-secondary"
                  aria-expanded={showSecondaryOptions}
                  className={`button-outline filter-bar__button button-arrow ${
                    showSecondaryOptions ? "active" : ""
                  }`}
                  type="button"
                  onClick={() => setShowSecondaryOptions(!showSecondaryOptions)}
                >
                  More options
                </button>
              </>
            )}
          </div>
          <div
            className="filter-bar__secondary"
            hidden={isDesktopMedia && !showSecondaryOptions}
            id="filters-secondary"
          >
            <div className="filter-bar__section">
              <FilterSelect
                combobox
                label="Resources"
                name="resources"
                options={resources}
                selectAllLabel="Show all resources"
                onClickView={(id) => {
                  const resource = resources.find(
                    (resource) => resource._id === id
                  );
                  if (resource) {
                    window.open(resource.url, "_blank", "noreferrer");
                  }
                }}
              />
            </div>

            {!isDesktopMedia && (
              <div className="filter-bar__section">
                <button
                  className="button-outline filter-bar__button"
                  onClick={() => {
                    setSearchParams({});
                  }}
                  type="button"
                >
                  Show all
                </button>
              </div>
            )}

            <div className="filter-bar__section filter-bar__end-section">
              <button
                className="button-secondary"
                type="button"
                onClick={() => setShowInfoDialog(true)}
              >
                What do the stages mean?
              </button>
              <a
                href="mailto:admin@sheffield.cityofsanctuary.org"
                className="button-secondary"
                type="button"
              >
                Send us feedback
              </a>
            </div>
          </div>
        </div>
      </div>

      {showInfoDialog && (
        <InfoDialog onClose={() => setShowInfoDialog(false)} />
      )}
    </>
  );
}
