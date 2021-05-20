module.exports = (req, res, next) => {
  console.log("\nin\n");
  if (!req.isAuthenticated()) res.redirect("/accounts/login");
  else next();
};
