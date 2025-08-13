import Recipe from "../models/Recipe.js";
import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const [user, recipeCount] = await Promise.all([
      User.findById(req.params.id).lean(),
      Recipe.countDocuments({ userId: req.params.id }),
    ]);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      code: "API.user.success",
      message: "User found successfully",
      data: { user, recipeCount },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error while fetching user" });
  }
};


export const updateUser = async (req, res) => {
  try {
    const { profilePicture, username, bio, fitnessGoal } = req.body;
    await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          profilePicture,
          username,
          bio,
          fitnessGoal,
        },
      }
    );
    res.status(200).json({
      code: "API.user.success",
      message: "User updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      code: "API.user.failed",
      message: "Error while updating user",
      error: err.message,
    });
  }
};
