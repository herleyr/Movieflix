const express = require("express");
const router = express.Router();
const moviescontroller = require("../Controllers/moviescontroller.js")

router.get("/", moviescontroller.findAll); 
router.get("/:id", moviescontroller.find);
router.post("/", moviescontroller.create);
router.delete("/:id", moviescontroller.delete);
router.put("/:id", moviescontroller.updateMovie);

module.exports = router;
