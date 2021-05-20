const { Router } = require("express");
const router = Router();
const ctrl = require("./mypage.ctrl");
const loginRequired = require("../../middleware/loginRequired");

router.get("/likes", ctrl.get_likes);

// \\d+ : 숫자만 받겠다는 뜻
module.exports = router;
