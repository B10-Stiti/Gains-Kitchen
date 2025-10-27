import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";


const Header = ({ onSearch, showSearch }) => {
  const navigate = useNavigate();
  const { userId, setUserId } = useContext(UserContext);
  const [SearchData, setSearchData] = useState({
    searchText: "",
    recipeType: "",
    fitnessGoal: "",
  });

  const fitnessGoals = ["Bulking", "Cutting", "Maintenance", "Muscle Gain"];
  const recipeTypes = [
    "Breakfast",
    "Lunch",
    "Snack",
    "Dinner",
    "Pre-Workout",
    "Post-Workout",
    "Dessert",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogout = async () => {
  try {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    const rep = await res.json();
    if (res.ok) {
      setUserId(null);
      navigate("/auth");
    }
  } catch (err) {
    console.error("Logout failed:", err);
  }
};

  return (
<header className="fixed top-0 w-full z-50 bg-white shadow-md border-b-2 border-red-500">
  {/* Top bar: Logo + Nav */}
  <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
    {/* Logo + Title */}
    <a href="/" className="flex items-center space-x-3">
      <img src="/logo.png" alt="Logo" className="h-10 w-10" />
      <h1 className="text-2xl font-bold text-red-500"> Gains Kitchen </h1>
    </a>

    {/* Navigation Links */}
    <nav className="flex items-center space-x-6">
      <a
        href="/"
        className="text-gray-700 hover:text-green-500 transition-colors"
      >
        Home
      </a>
      <a
        href={userId ? "/profile" : "/auth"}
        className="text-gray-700 hover:text-green-500 transition-colors"
      >
        Profile
      </a>
      <a
        href={userId ? "/favorites" : "/auth"}
        className="text-gray-700 hover:text-green-500 transition-colors"
      >
        Favorites
      </a>
      <a
        href={userId ? "/share-recipe" : "/auth"}
        className="text-gray-700 hover:text-green-500 transition-colors"
      >
        Share Recipe
      </a>

      {userId ? (
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white transition-colors"
        >
          Logout
        </button>
      ) : (
        <a
          href="/auth"
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white transition-colors"
        >
          Login/Register
        </a>
      )}
    </nav>
  </div>

  {/* Search Form */}
  {showSearch && (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(SearchData);
      }}
      className="flex items-center space-x-3 max-w-7xl mx-auto px-6 py-3 border-t bg-white"
    >
      {/* Search Bar */}
      <input
        type="text"
        value={SearchData.searchText}
        name="searchText"
        onChange={handleChange}
        placeholder="Search for Recipe..."
        className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 w-64 text-gray-900"
      />

      {/* Recipe Type */}
      <select
        value={SearchData.recipeType}
        name="recipeType"
        onChange={handleChange}
        className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
      >
        <option value="" disabled>
          Recipe Type
        </option>
        {recipeTypes.map((type, idx) => (
          <option value={type} key={idx}>
            {type}
          </option>
        ))}
      </select>

      {/* Fitness Goal */}
      <select
        value={SearchData.fitnessGoal}
        name="fitnessGoal"
        onChange={handleChange}
        className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
      >
        <option value="" disabled>
          Fitness Goal
        </option>
        {fitnessGoals.map((goal, idx) => (
          <option value={goal} key={idx}>
            {goal}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
      >
        Search
      </button>
    </form>
  )}
</header>

  );
};

export default Header;
