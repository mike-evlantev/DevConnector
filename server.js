const express = require("express");
const path = require("path");
const connectDb = require("./config/db");

const auth = require("./routes/api/auth");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

// Connect Database
connectDb();

// Init Middleware
app.use(express.json({ extended: false })); // allows to get data from request body

// Use Routes
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// Serve static (react) assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  // when home page route is hit load index.html
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  ); // look in currentDirectory/client/build/index.html
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
