import React from "react";
import {Routes, Route } from "react-router-dom";
import ShareRecipe from "./components/ShareRecipe"
import AuthForm from "./components/AuthForm"
import Profile from "./components/Profile"
import Favorites from "./components/Favorites";
import Recipes from "./components/Recipes";
import Header from "./components/Header";
import {AuthProvider} from "./AuthContext";
function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/share-recipe" element={<ShareRecipe />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/recipes" element={<Recipes />} />
      </Routes>
      </AuthProvider>
  );
}

export default App
  