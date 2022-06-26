import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  household: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "households",
  },
  name: { type: String, trim: true, required: true },
  budget: { type: Number, required: true, default: 0.0 },
});

export default mongoose.models.accounts ||
  mongoose.model("accounts", accountSchema);
