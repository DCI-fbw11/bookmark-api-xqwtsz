// Modules
const express = require("express");
const mongoose = require("mongoose");

// Creating the router
const router = express.Router();

// Bring in model
const Bookmark = require("../models/Bookmark");

// @route   GET api/bookmarks
// @desc    gets all the bookmarks
// @access  Public
router.get("/", async (req, res) => {
  const bookmarks = await Bookmark.find({}).exec();
  if (bookmarks) {
    res.send(bookmarks);
  } else {
    res.send("something went wrong");
  }
});

// @route   GET api/bookmarks/:id
// @desc    gets one bookmark with id
// @access  Public
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const bookmark = await Bookmark.findOne({ _id: id }).exec();
  if (bookmark) {
    res.send(bookmark);
  } else {
    res.send("something went wrong");
  }
});

// @route   POST api/bookmarks/
// @desc    adds one bookmark
// @access  Public
router.post("/", async (req, res) => {
  const { bookmark } = req.body;
  const { url, tag, created } = bookmark;
  const newEntry = new Bookmark({
    url,
    tag,
    created
  });
  newEntry.save((err, newEntry) => {
    if (err) {
      console.error(err);
    }
    res.send(newEntry);
  });
});

// @route   PUT api/bookmarks/:id
// @desc    edits one bookmark with id
// @access  Public
router.put("/:id", async (req, res) => {
  const { bookmark } = req.body;
  const { id } = req.params;
  const { url, tag } = bookmark;
  try {
    if (mongoose.Types.ObjectId.isValid(id)) {
      const found = await Bookmark.findOne({ _id: id }).exec();
      if (found) {
        Bookmark.findOneAndUpdate(
          {
            _id: id
          },
          { $set: { tag, url } },
          { new: true },
          (err, updated) => {
            if (err) console.log(err);
            res.send(updated);
          }
        );
      } else {
        res.send(`no bookmark with that id: ${id}`);
      }
    } else {
      res.send("not a valid id");
    }
  } catch (error) {
    res.send(error);
  }
});

// @route   DELETE api/bookmarks/:id
// @desc    deletes one bookmark with id
// @access  Public
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Bookmark.deleteOne({ _id: id }).exec();
    res.send(`Success: Bookmark with the id ${id}, deleted.`);
  } catch (error) {
    res.send(error);
  }
});

/* 
Tank.deleteOne({ size: 'large' }, function (err) {
  if (err) return handleError(err);
  // deleted at most one tank document
});
*/
module.exports = router;
