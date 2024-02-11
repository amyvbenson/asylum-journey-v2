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
      <input
        className="home-search__input"
        type="search"
        name="search"
        id="search"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="button-link" type="submit">
        Search
      </button>
    </form>
  );
}
