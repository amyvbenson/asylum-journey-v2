import { useSearchParams } from "react-router-dom";
import "./filterSearch.css";
import { useState } from "react";

export default function FilterSearch() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState<string>();

  return (
    <form
      className="filter-search"
      onSubmit={(e) => {
        e.preventDefault();
        if (searchTerm) {
          setSearchParams(() => {
            searchParams.set("q", searchTerm);

            return searchParams;
          });
          // onSubmit(searchTerm.toLowerCase());
        }
      }}
    >
      <label className="sr-only" htmlFor="search">
        Search
      </label>
      <input
        className="filter-search__input"
        id="search"
        placeholder="Search"
        type="search"
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <button className="filter-search__button" type="submit">
        <svg
          aria-hidden
          className="filter-search__icon"
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 36 36"
          width="40"
          height="40"
        >
          <path
            d="M25.7 24.8L21.9 21c.7-1 1.1-2.2 1.1-3.5 0-3.6-2.9-6.5-6.5-6.5S10 13.9 10 17.5s2.9 6.5 6.5 6.5c1.6 0 3-.6 4.1-1.5l3.7 3.7 1.4-1.4zM12 17.5c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5-2 4.5-4.5 4.5-4.5-2-4.5-4.5z"
            fill="currentColor"
          />
        </svg>
        <span className="sr-only">Submit</span>
      </button>
    </form>
  );
}
