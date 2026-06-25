import mongoose from "mongoose";

const applicationSchema =
  new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      company: {
        type: String,
        required: true,
      },

      role: {
        type: String,
        required: true,
      },

      status: {
        type: String,
        enum: [
          "Applied",
          "Interview",
          "Selected",
          "Rejected",
        ],
        default: "Applied",
      },

      interviewDate: {
        type: Date,
        default: null,
      },
      hrContact: {
        type: String,
        default: "",
      },

      salary: {
        type: String,
        default: "",
      },

      location: {
        type: String,
        default: "",
      },

      notes: {
        type: String,
        default: "",
      },
      
    },
    {
      timestamps: true,
    }
  );

const Application = mongoose.model(
  "Application",
  applicationSchema
);

export default Application;