import React, { useEffect, useState } from "react";

const Profile = () => {
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

      const data = await res.json();
      console.log("upload repond :", data);
      setUserData({
        ...userData,
        user: { ...userData.user, profilePicture: data.imageUrl },
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const url = "/api/user/" + user._id;
      const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        console.error("Error:", res.status, res.statusText);
        return;
      }
      const rep = await res.json();
      setUserData(rep.data);
    };
    fetchData();
  }, []);

  const fitnessGoals = ["Bulking", "Cutting", "Maintenance", "Muscle Gain"];
  const { profilePicture, username, bio, fitnessGoal, favorites } =
    userData.user;
  return (
    <div>
      <button type="button" onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? "Cancel" : "Edit Profile"}
      </button>
      <form>
        {/* Profil image */}
        {isEditing ? (
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            required
            onChange={handleImageChange}
          />
        ) : (
          <img src={ profilePicture || "/profil-default.jpg"}/>
        )}
        {/* Username */}
        <label> Username </label>
        {isEditing ? (
          <input
            type="text"
            value={username}
            onChange={(e) =>
              setUserData({
                ...userData,
                user: { ...userData.user, username: e.target.value },
              })
            }
          />
        ) : (
          <div>{username}</div>
        )}
        {/* Bio */}
        <label> Bio </label>
        {isEditing ? (
          <input
            type="text"
            value={bio}
            onChange={(e) =>
              setUserData({
                ...userData,
                user: { ...userData.user, bio: e.target.value },
              })
            }
          />
        ) : (
          <div> {bio} </div>
        )}

        {/* Fitness Goal */}
        {isEditing ? (
          <select
            value={fitnessGoal}
            onChange={(e) =>
              setUserData({
                ...userData,
                user: { ...userData.user, fitnessGoal: e.target.value },
              })
            }
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
        ) : (
          <div> {fitnessGoal} </div>
        )}
        <div> Stats </div>
        <div> Nb of recipes shared : {userData.recipeCount} </div>
        <div> Nb of favorite recipes: {favorites?.length || 0} </div>

        {isEditing && (
          <button
            type="button"
            onClick={async () => {
              const user = JSON.parse(localStorage.getItem("user"));
              const url = "/api/user/" + user._id;
              const res = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData.user),
              });
              if (res.ok) setIsEditing(false);
            }}
          >
            Save
          </button>
        )}
      </form>
    </div>
  );
};

export default Profile;
