import { useState, useEffect } from "react";

const { VITE_PROJECT_ID, VITE_API_VERSION, VITE_DATASET } = import.meta.env;

const useFetch = (query: string, shouldFetch: boolean = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(shouldFetch);

  const url = `https://${VITE_PROJECT_ID}.api.sanity.io/${VITE_API_VERSION}/data/query/${VITE_DATASET}?query=${query}`;

  async function fetchData() {
    const response = await fetch(url);
    const json = await response.json();
    setData(json.result);
    setLoading(false);
  }

  useEffect(() => {
    if (shouldFetch) {
      fetchData();
    }
  }, [shouldFetch]);

  return { loading, data };
};

export default useFetch;
