import React from "react";
import { Routes, Route } from "react-router-dom";
import ShareRecipe from "./pages/ShareRecipe";
import AuthForm from "./pages/AuthForm";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import Recipes from "./pages/Recipes";
import { AuthProvider } from "./context/AuthContext";
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/share-recipe" element={<ShareRecipe />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/recipes" element={<Recipes />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
