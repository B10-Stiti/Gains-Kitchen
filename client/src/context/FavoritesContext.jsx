import React, { createContext, useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";


const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { userId } = useContext(UserContext);
  const [userFavorites, setUserFavorites] = useState([]);

  // Fetch favorite IDs when userId changes
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userId) {
        setUserFavorites([]);
        return;
      }
      try {
        const url = `/api/user/${userId}/favorites`;
        const res = await fetch(url, {credentials: "include"});
        const rep = await res.json();
        if (!res.ok) throw new Error(rep.message);
        setUserFavorites(rep.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFavorites();
  }, [userId]);

  // Add favorite
  const addFavorite = async (recipeId) => {
    if (!userId) return;
    try {
      const url = `/api/user/${userId}/favorites/${recipeId}`;
      const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include" });
      const rep = await res.json();
      if (!res.ok) throw new Error(rep.message || "Failed to add favorite");
      setUserFavorites((prev) => [...prev, recipeId]);
    } catch (err) {
      console.error(err);
    }
  };

  // Remove favorite
  const removeFavorite = async (recipeId) => {
    if (!userId) return;
    try {
      const url = `/api/user/${userId}/favorites/${recipeId}`;
      const res = await fetch(url, { method: "DELETE", headers: { "Content-Type": "application/json" }, credentials: "include" });
      const rep = await res.json();
      if (!res.ok) throw new Error(rep.message || "Failed to remove favorite");
      setUserFavorites((prev) => prev.filter((id) => id !== recipeId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FavoritesContext.Provider value={{ userFavorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook for easier usage
export const useFavorites = () => useContext(FavoritesContext);
