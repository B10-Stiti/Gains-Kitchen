import React, { useEffect, useState, useContext } from "react";
import ProfileHeader from "../components/ProfileHeader";
import ProfileEditForm from "../components/ProfileEditForm";
import RecipeCard from "../components/RecipeCard";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { userId } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    user: {
      profilePicture: "",
      username: "",
      bio: "",
      fitnessGoal: "",
      favorites: [],
    },
    recipeCount: 0,
    userRecipes: [],
  });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const rep = await res.json();
      setUserData({
        ...userData,
        user: { ...userData.user, profilePicture: rep.imageUrl },
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = "/api/user/" + userId;
      const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const rep = await res.json();
      console.log(rep);
      if (!res.ok) {
        console.error("Error:", res.status, res.statusText);
        return;
      }
      setUserData(rep.data);
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto mt-8 px-4">
      {isEditing ? (
        <ProfileEditForm
          userData={userData}
          setUserData={setUserData}
          handleImageChange={handleImageChange}
          setIsEditing={setIsEditing}
        />
      ) : (
        <ProfileHeader userData={userData} setIsEditing={setIsEditing} />
      )}

      {/* My Recipes Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 border-b-2 border-green-500 pb-2">
          My Recipes
        </h2>
        {userData.userRecipes.length === 0 ? (
          <p className="text-gray-500">No recipes shared yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {userData.userRecipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
