var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var slice = require("../models/slice.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  slice.all(function(data) {
    var hbsObject = {
      slices: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/slices", function(req, res) {
  slice.create([
    "name", "eaten"
  ], [
    req.body.name, req.body.eaten
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/slices/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  slice.update({
    eaten: req.body.eaten
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/slices/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  slice.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
