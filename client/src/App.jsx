import React from "react";
import { Routes, Route } from "react-router-dom";
import ShareRecipe from "./pages/ShareRecipe";
import AuthForm from "./pages/AuthForm";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import Home from "./pages/Home";
function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/share-recipe" element={<ShareRecipe />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
