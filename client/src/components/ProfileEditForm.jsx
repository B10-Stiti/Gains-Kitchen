import React from "react";
import { UserContext } from "../context/UserContext";

const ProfileEditForm = ({ userData, setUserData, handleImageChange, setIsEditing }) => {
  const { profilePicture, username, bio, fitnessGoal } = userData.user;
  const fitnessGoals = ["Bulking", "Cutting", "Maintenance", "Muscle Gain"];
  const { userId } = useContext(UserContext);

  const handleSave = async () => {
    const url = "/api/user/" + userId;
    const res = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData.user),
      credentials: "include",
    });
    if (res.ok) setIsEditing(false);
  }; 
  return (
    <form className="flex flex-col gap-8 bg-white p-6 rounded-2xl shadow-lg mb-8">
      {/* Profile Image */}
      <div className="flex flex-col items-center">
        <input
          type="file"
          onChange={handleImageChange}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <img
          src={profilePicture || "/profil-default.jpg"}
          alt="Profile"
          className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover shadow-xl border-4 border-green-500 mt-4"
        />
      </div>

      {/* Username */}
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700 font-semibold">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) =>
            setUserData({
              ...userData,
              user: { ...userData.user, username: e.target.value },
            })
          }
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* Bio */}
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700 font-semibold">Bio</label>
        <input
          type="text"
          value={bio}
          onChange={(e) =>
            setUserData({
              ...userData,
              user: { ...userData.user, bio: e.target.value },
            })
          }
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* Fitness Goal */}
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700 font-semibold">Fitness Goal</label>
        <select
          value={fitnessGoal}
          onChange={(e) =>
            setUserData({
              ...userData,
              user: { ...userData.user, fitnessGoal: e.target.value },
            })
          }
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
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
      </div>

      {/* Save Button */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleSave}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full shadow-md transition"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default ProfileEditForm;
