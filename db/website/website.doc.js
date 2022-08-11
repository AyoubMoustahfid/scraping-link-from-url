import mongoose from "mongoose"

const websiteSchema = new mongoose.Schema(
  {
    websites: [
      {
        type: String,
        unique: true,
        required: true,
      },
    ],
    keyWords: [
      {
        type: String,
        index: true,
        unique: true,
        required: true,
      },
    ],
  },
  { timestamps: true }
)

export default mongoose.model("Website", websiteSchema)
