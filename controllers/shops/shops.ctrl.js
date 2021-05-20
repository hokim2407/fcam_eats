const models = require("../../models");

exports.get_shops_detail = async (req, res) => {
  const shop = await models.Shops.findOne({
    where: { id: req.params.id },
    include: ["Menu", "LikeUser", "Tag"],
  });
  let active = false;
  if (req.isAuthenticated()) {
    const user = await models.User.findByPk(req.user.id);
    active = await shop.hasLikeUser(user);
  }
  const countLike = await shop.countLikeUser();
  let cartList = {};
  let cartLength = 0;
  let sameShops = true;

  if (typeof req.cookies.cartList !== "undefined") {
    cartList = JSON.parse(unescape(req.cookies.cartList));
    cartLength = Object.keys(cartList).length;
    for (let key in cartList)
      if (cartList[key].shop_id !== parseInt(req.params.id)) sameShops = false;
  }

  res.render("shops/detail.html", {
    shop,
    cartLength,
    sameShops,
    countLike,
    active,
  });
};

exports.post_shops_like = async (req, res) => {
  console.log(req.body);
  const shop = await models.Shops.findByPk(req.params.shop_id);
  const user = await models.User.findByPk(req.user.id);
  const status = await shop.addLikeUser(user);
  console.log("1 status: " + status);
  res.json({ status });
};

exports.delete_shops_like = async (req, res) => {
  const shop = await models.Shops.findByPk(req.params.shop_id);
  const user = await models.User.findByPk(req.user.id);
  const status = await shop.removeLikeUser(user);
  res.json({ message: "success" });
};
