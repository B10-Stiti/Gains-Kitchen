import React from "react";

const ProfileHeader = ({ userData, setIsEditing }) => {
  const { profilePicture, username, bio, fitnessGoal, favorites, recipeCount } =
    userData.user;

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-between bg-white p-6 rounded-2xl shadow-lg mb-8">
      {/* Profile Picture */}
      <div className="flex-shrink-0 mb-4 md:mb-0">
        <img
          src={profilePicture || "/profil-default.jpg"}
          alt="Profile"
          className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover shadow-xl border-4 border-green-500"
        />
      </div>

      {/* User Info */}
      <div className="flex-1 md:ml-8 flex flex-col justify-center items-center md:items-start text-center md:text-left">
        <div className="flex items-center mb-2">
          <h1 className="text-3xl font-bold text-gray-900 mr-4">{username}</h1>
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full font-semibold transition"
          >
            Edit Profile
          </button>
        </div>

        <p className="text-gray-600 mb-2">{bio || "No bio yet"}</p>
        <span className="text-green-600 font-medium">{fitnessGoal || "No fitness goal selected"}</span>

        {/* Stats */}
        <div className="mt-4 flex space-x-6">
          <div className="text-center">
            <p className="font-bold text-gray-900">{userData.recipeCount}</p>
            <p className="text-gray-500 text-sm">Recipes</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-gray-900">{favorites?.length || 0}</p>
            <p className="text-gray-500 text-sm">Favorites</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
