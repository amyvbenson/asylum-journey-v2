import { Link } from "react-router-dom";
import { getCategoriesQuery, getStagesQuery } from "../utils/queryBuilder";
import useFetch from "../hooks/useFetch";
import { useContext, useEffect } from "react";
import { DataContext, DataContextType } from "../contexts/dataContext";
import "./home.css";
import Header from "./components/Header";
import Search from "./components/Search";
import StagesAndCategories from "./components/StagesAndCategories";

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

  const { categories, stages, setStages, setCategories } = useContext(
    DataContext
  ) as DataContextType;

  useEffect(() => {
    if (fetchedStages) {
      setStages(fetchedStages);
    }
  }, [fetchedStages]);

  useEffect(() => {
    if (fetchedCategories) {
      setCategories(fetchedCategories);
    }
  }, [fetchedCategories]);

  return (
    <main>
      <Header />
      <div className="container">
        <div className="home-start">
          <Search />
          <StagesAndCategories
            loading={loadingCategories || loadingStages}
            categories={categories}
            stages={stages}
          />
        </div>
      </div>
      <div className="home-info">
        <div className="container home-info-container">
          <div>
            <h2>Welcome to the Asylum Journey</h2>
            <p>
              This website has information about the services and resources for
              asylum seekers and refugees in Sheffield.
            </p>

            <p>
              Covering all stages of the asylum process and all kinds of
              statutory and informal support, the Asylum Journey will help you
              provide more informed and holistic advice.
            </p>

            <p>
              If you have any comments or feedback, or if you spot any gaps or
              errors, please contact{" "}
              <a href="mailto:admin@sheffield.cityofsanctuary.org">
                admin@sheffield.cityofsanctuary.org
              </a>
              .
            </p>
          </div>
          <div>
            <div className="home-info__cta">
              <h3>Keep up to date</h3>
              <p>
                <a href="https://asylumjourneysheffield.wordpress.com/">
                  Keep up to date with the Asylum Journey and get news of
                  one-off events - follow us here
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="container">
          <h3>The Asylum Journey is supported by:</h3>
          <ul className="home-logos">
            <li>
              <a href="https://www.sheffield.gov.uk/">
                <img src="/public/scclogo.jpg" alt="Sheffield City Council" />
              </a>
            </li>
            <li>
              <img src="/public/sheffugeeslogo.jpg" alt="Sheffugees" />
            </li>
            <li>
              <a href="https://sheffield.cityofsanctuary.org/">
                <img
                  src="/public/coslogo.jpg"
                  alt="Sheffield City of Sanctuary"
                />
              </a>
            </li>
            <li>
              <a href="http://www.assistsheffield.org.uk/">
                <img src="/public/assistlogo.jpg" alt="Assist Sheffield" />
              </a>
            </li>
            <li>
              <a href="http://www.vas.org.uk/">
                <img
                  src="/public/vaslogo.jpg"
                  alt="Voluntary Action Sheffield"
                />
              </a>
            </li>
            <li>
              <a href="https://www.yoomee.com/">
                <img src="/public/yoomeelogo.jpg" alt="Yoomee" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
