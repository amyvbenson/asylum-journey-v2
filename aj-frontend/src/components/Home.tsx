import { Link } from "react-router-dom";
import { getCategoriesQuery, getStagesQuery } from "../utils/queryBuilder";
import useFetch from "../hooks/useFetch";
import { useContext, useEffect } from "react";
import { DataContext, DataContextType } from "../contexts/dataContext";

interface Category {
  _id: string;
  name: string;
}

interface Stage {
  _id: string;
  name: string;
}

export default function Home() {
  const { loading: loadingStages, data: fetchedStages = [] as Stage[] } =
    useFetch(getStagesQuery());
  const {
    loading: loadingCategories,
    data: fetchedCategories = [] as Category[],
  } = useFetch(getCategoriesQuery());

  const {
    data: { categories, stages },
    storeStages,
    storeCategories,
  } = useContext(DataContext) as DataContextType;

  useEffect(() => {
    if (fetchedStages) {
      console.log("store stages");
      storeStages(fetchedStages);
    }
  }, [fetchedStages]);

  useEffect(() => {
    if (fetchedCategories) {
      console.log("store cats");
      storeCategories(fetchedCategories);
    }
  }, [fetchedCategories]);

  return (
    <div>
      <h1>Asylum Journey</h1>
      {loadingStages ? (
        <p>Loading</p>
      ) : (
        <>
          {stages && stages.length > 0 && (
            <ul>
              {stages.map((stage) => (
                <li key={stage._id}>
                  <Link to={`/services?stage=${stage._id}`}>{stage.name}</Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
      {loadingCategories ? (
        <p>Loading</p>
      ) : (
        <>
          {categories && categories.length > 0 && (
            <ul>
              {categories.map((category) => (
                <li key={category._id}>{category.name}</li>
              ))}
            </ul>
          )}
        </>
      )}

      <Link to="/service">Tool</Link>
    </div>
  );
}
