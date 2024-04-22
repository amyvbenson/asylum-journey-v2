import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./search.css";

export default function Search() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>();

  return (
    <form
      className="home-search"
      onSubmit={(e) => {
        e.preventDefault();
        navigate(`/services?q=${searchTerm}`);
      }}
    >
      <h2>
        <label htmlFor="search">Search for a service</label>
      </h2>
      <p>Search for specific services by keyword</p>
      <div className="home-search__container">
        <input
          className="home-search__input"
          placeholder="Search by keyword"
          type="search"
          name="search"
          id="search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="button-primary" type="submit">
          Search
        </button>
      </div>
    </form>
  );
}
