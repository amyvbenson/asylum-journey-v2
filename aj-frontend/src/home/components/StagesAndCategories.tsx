import { Category, Stage } from "../../types/dataTypes";
import orderByPosition from "../../utils/orderByPosition";
import "./stagesAndCategories.css";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  categories: Category[];
  loading: boolean;
  stages: Stage[];
}

export default function StagesAndCategories({
  categories,
  loading,
  stages,
}: Props) {
  const [selectedStage, setSelectedStage] = useState<string>();
  const [showCategories, setShowCategories] = useState<boolean>(false);

  return (
    <div className="home-filters">
      {loading ? (
        <div className="tool__loader">
          <img src="/public/loader-logo.svg" alt="" />
          Loading...
        </div>
      ) : (
        <>
          <h2>Select a stage</h2>
          {!!stages.length && (
            <ul className="home-filters__stages">
              {stages.map((stage) => (
                <li key={stage._id}>
                  <button
                    className={`home-filters__stage home-filters__${
                      stage._id
                    } ${selectedStage === stage._id ? "active" : ""}`}
                    type="button"
                    onClick={() => {
                      setSelectedStage(stage._id);
                      setShowCategories(true);
                    }}
                  >
                    {stage.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
          {showCategories && (
            <>
              <h2>Select a category</h2>
              <ul className="home-filters__stages">
                {orderByPosition(categories).map((category) => (
                  <li key={category._id}>
                    <Link
                      className="home-filters__stage home-filters__category"
                      to={`/services?stages=${selectedStage}&categories=${category._id}`}
                    >
                      <span>{category.name}</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    className="home-filters__stage home-filters__category"
                    to="/services"
                  >
                    <span>All</span>
                  </Link>
                </li>
              </ul>
            </>
          )}
          <h2>View all services</h2>
          <p>
            Start with an overview of all services then filter by stage,
            category, service users and provider to find the information you
            need.
          </p>
          <a className="button-link" href="/services">
            <span>View all services</span>
          </a>
        </>
      )}
    </div>
  );
}
