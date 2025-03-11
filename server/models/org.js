import mongoose from "mongoose";

const orgSchema = new mongoose.Schema(
  {
    orgName: {
      type: String,
      required: true,
    },
    orgType: {
      type: String,
      required: true,
    },
    donations: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        foods: [{ type: mongoose.Schema.Types.ObjectId, ref: "Food" }],
      },
    ],
  },
  { timestamps: true }
);

const Org = mongoose.model("Org", orgSchema);

export default Org;
