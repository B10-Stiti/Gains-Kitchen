import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import RecipeCard from "../components/RecipeCard";
import Footer from "../components/Footer";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [filters, setFilters] = useState({
    searchText: "",
    recipeType: "",
    fitnessGoal: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      // Build query params dynamically
      const params = new URLSearchParams();
      if (filters.searchText) params.append("search", filters.searchText);
      if (filters.recipeType) params.append("type", filters.recipeType);
      if (filters.fitnessGoal) params.append("goal", filters.fitnessGoal);

      const url = `/api/recipes?${params.toString()}`;
      const res = await fetch(url);
      const rep = await res.json();
      console.log(rep);
      if (!res.ok) {
        console.error("Error:", res.status, res.statusText);
        return;
      }
      setRecipes(rep.data);
    };
    fetchData();
  }, [filters]);

  const onSearch = (searchData) => {
    setFilters(searchData);
  };
  return (
    <section className="bg-gray-50 min-h-screen pt-28 flex flex-col">
      <Header showSearch={true} onSearch={onSearch} />

      <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col space-y-6 px-4">
        {!recipes || recipes.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-gray-500 text-3xl md:text-3xl font-semibold text-center">
              No recipes found.
            </p>
          </div>
        ) : (
          recipes.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              className="w-full bg-white rounded-lg shadow-md"
            />
          ))
        )}
      </div>

      <Footer />
    </section>
  );
};

export default Home;
