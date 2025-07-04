import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    ingredients: { type: [String], required: true },
    recipeType: { type: String, required: true },
    fitnessGoal: { type: String, required: true },
    instructions: { type: String, required: true }
    
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);
export default Recipe;
