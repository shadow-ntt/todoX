const express = require("express");
const TodoXController = require("../controllers/TodoXController");
const router = express.Router();

router.get("/about", (req, res) => {
  res.send("About birds");
});
router.get("/", TodoXController.getAll);
router.post("/add", TodoXController.add);
router.post("/:id/update", TodoXController.update);
router.delete("/:id/delete", TodoXController.delete);

module.exports = router;
