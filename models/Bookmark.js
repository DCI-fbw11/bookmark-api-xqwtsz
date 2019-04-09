const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BookmarkSchema = new Schema({
  url: String,
  tag: [String],
  created: Number
});
// The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural, lowercased version of your model name. Thus, for the example above, the model Nut is for the nuts collection in the database.
module.exports = Bookmark = mongoose.model("bookmark", BookmarkSchema);
