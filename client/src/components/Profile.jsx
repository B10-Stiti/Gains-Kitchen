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
  const { profilePicture, username, bio, fitnessGoal, favorites } = userData.user;

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-md text-gray-900">
      <button
        type="button"
        onClick={() => setIsEditing(!isEditing)}
        className="mb-6 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition"
      >
        {isEditing ? "Cancel" : "Edit Profile"}
      </button>
      <form className="flex flex-col gap-6">
        {/* Profile Image */}
        <div className="flex flex-col items-center">
          {isEditing ? (
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              required
              onChange={handleImageChange}
              className="border border-gray-300 rounded px-3 py-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          ) : (
            <img
              src={profilePicture || "/profil-default.jpg"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover shadow-md"
            />
          )}
        </div>

        {/* Username */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Username</label>
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
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          ) : (
            <div className="p-2 bg-white rounded border border-gray-200">{username}</div>
          )}
        </div>

        {/* Bio */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Bio</label>
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
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          ) : (
            <div className="p-2 bg-white rounded border border-gray-200">{bio}</div>
          )}
        </div>

        {/* Fitness Goal */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Fitness Goal</label>
          {isEditing ? (
            <select
              value={fitnessGoal}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  user: { ...userData.user, fitnessGoal: e.target.value },
                })
              }
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="" disabled>
                Select Fitness Goal
              </option>
              {fitnessGoals.map((goal, idx) => (
                <option value={goal} key={idx}>
                  {goal}
                </option>
              ))}
            </select>
          ) : (
            <div className="p-2 bg-white rounded border border-gray-200">{fitnessGoal}</div>
          )}
        </div>

        {/* Stats */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Stats</h3>
          <p>Nb of recipes shared: {userData.recipeCount}</p>
          <p>Nb of favorite recipes: {favorites?.length || 0}</p>
        </div>

        {/* Save Button */}
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
            className="mt-4 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded transition"
          >
            Save
          </button>
        )}
      </form>
    </div>
  );
};

export default Profile;
