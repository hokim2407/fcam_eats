const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  let totalAmount = 0;
  let cartList = {};
  if (typeof req.cookies.cartList !== "undefined") {
    cartList = JSON.parse(unescape(req.cookies.cartList));
    for (const key in cartList) totalAmount += parseInt(cartList[key].price);
  }

  res.render("cart/index.html", { cartList, totalAmount });
});

module.exports = router;
