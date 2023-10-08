import mongoose from "mongoose";
import app from "./app.js";

const {DB_HOST, PORT=3000} = process.env;

// 6mqXHh7namqnu

// const DB_HOST =
//   "mongodb+srv://Sergey:6mqXHh7namqnu@cluster0.x8du0ty.mongodb.net/db-contacts?retryWrites=true&w=majority&appName=AtlasApp";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
