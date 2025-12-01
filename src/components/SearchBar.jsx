import React from "react";
import "./SearchBar.css";

const categories = [
  "All Categories",
  "Notes",
  "Calculators",
  "Lab Gear",
  "Electronics",
];

export default function SearchBar({ query, onQueryChange, category, onCategoryChange }) {
  return (
    <div className="searchbar-wrapper">
      <input
        className="search-input"
        placeholder="Search notes, textbooks, lab coats..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="cat-select"
      >
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <button className="search-btn">Search</button>
    </div>
  );
}
