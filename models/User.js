import { Schema, model } from "mongoose";
import Joi from "joi";

import { handleSaveError, runValidatorsAtUpdate } from "./hooks.js";

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  avatarURL: String,
  token: {
    type: String,
    default: null,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
  },
});

userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", runValidatorsAtUpdate);

userSchema.post("findOneAndUpdate", handleSaveError);

export const userSignupSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string(),
  token: Joi.string(),
});

export const userSigninSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
});

export const userEmailSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": `missing required field "email"`,
  }),
});

const User = model("user", userSchema);
export default User;
