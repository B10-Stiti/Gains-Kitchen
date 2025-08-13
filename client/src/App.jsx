import React from "react";
import {Routes, Route } from "react-router-dom";
import ShareRecipe from "./components/ShareRecipe"
import AuthForm from "./components/AuthForm"
import Profile from "./components/Profile"

function App() {

  return (
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/share-recipe" element={<ShareRecipe />} />
      </Routes>
  );
}

export default App
  