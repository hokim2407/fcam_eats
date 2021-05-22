const express = require("express");
const router = express.Router();
const ctrl = require("./checkout.ctrl");
const loginRequired = require("../../middleware/loginRequired");

router.get("/", loginRequired, ctrl.index);
router.post("/complete", loginRequired, ctrl.post_complete);
router.get("/complete", loginRequired, ctrl.get_complete);
router.get("/success", loginRequired, ctrl.get_success);

module.exports = router;
