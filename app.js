// Importing modules
const express = require("express");
const mongoose = require("mongoose");
const chalk = require("chalk");

// Importing Routes
const Bookmarks = require("./routes/bookmarks");

// Initialize express
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/bookmarks", Bookmarks);

// Connecting to Database
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => console.log(chalk.green.bold("MongoDB connected...")))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Test is working.");
});

const port = process.env.PORT || 4000;

app.listen(port, () =>
  console.log(chalk.blue.bold(`Express server running on port: ${port}`))
);
