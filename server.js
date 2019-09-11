const express = require("express");
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

app.get("/", (req, res) => res.send("Hello!"));

// Use Routes
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
