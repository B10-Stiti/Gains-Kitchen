import React from "react";
import { Routes, Route } from "react-router-dom";
import ShareRecipe from "./pages/ShareRecipe";
import AuthForm from "./pages/AuthForm";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import { FavoritesProvider } from "./context/FavoritesContext";
import { UserProvider } from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute"

import Home from "./pages/Home";
function App() {
  return (
    <UserProvider>
      <FavoritesProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
        <Route path="/share-recipe" element={<ProtectedRoute> <ShareRecipe /> </ProtectedRoute> } />
        <Route path="/favorites" element={<ProtectedRoute> <Favorites /> </ProtectedRoute>} />
      </Routes>
      </FavoritesProvider>
      </UserProvider>
  );
}

export default App;
