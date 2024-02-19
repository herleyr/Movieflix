const express = require("express");
const router = express.Router();
const categorycontroller = require("../Controllers/categorycontroller.js")

router.get("/", categorycontroller.findAll); 
router.get("/:id", categorycontroller.find);
router.post("/", categorycontroller.create);
router.delete("/:id", categorycontroller.delete);
router.put("/:id", categorycontroller.updatecategory);


module.exports = router;
