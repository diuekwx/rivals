import { NavLink } from "react-router-dom";
import React, { useState } from 'react';
import SearchBar from "./Searchbar";

export default function Navbar() {
  const handleSearch = (term) => {
    // This function will be called when the search term changes
    console.log("Searching for:", term);
    // You could implement immediate filtering here if needed
  };

  return (
    // change position, sticky maybe
    <div className="sticky top-0 z-10 bg-white w-full left-0 right-0 pl-4 pr-4 pt-4">
      <nav className="flex justify-between items-center mb-6">
        <NavLink to="/" className="whitespace-nowrap">
          My Dearest Rival
        </NavLink>
        <SearchBar onSearch={handleSearch}  />
        <NavLink 
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3" 
          to="/create"
        >
          Create Post
        </NavLink>
      </nav>
    </div>
  );
}