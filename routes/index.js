var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "recipe app" });
});

router.get("/recipe/:food", function (req, res, next) {
  res.json({
    name: req.params.food,
    instructions: ["step 1", "step 2", "step 3"],
    ingredients: ["Make dough", "add ingridients", "Bake pizza"],
  });
});

router.post("/recipe/", function (req, res, next) {
  res.json(req.body);
});

router.post("/images", function (req, res, next) {
  res.send("Image is here");
});

module.exports = router;
