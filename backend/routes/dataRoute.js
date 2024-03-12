const express = require("express");
const router = express.Router();

const dataCtrl = require("../controllers/dataController");

router.get("/categories", dataCtrl.getCategories);
router.get("/data", dataCtrl.getAlldata);
router.get("/filter", dataCtrl.getFiltereddata);

module.exports = router;
