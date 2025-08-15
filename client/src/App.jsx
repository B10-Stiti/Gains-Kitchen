import React from "react";
import {Routes, Route } from "react-router-dom";
import ShareRecipe from "./components/ShareRecipe"
import AuthForm from "./components/AuthForm"
import Profile from "./components/Profile"
import Favorites from "./components/Favorites";
import Recipes from "./components/Recipes";

function App() {

  return (
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/share-recipe" element={<ShareRecipe />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/recipes" element={<Recipes />} />
      </Routes>
  );
}

export default App
  