const { send } = require("micro");
// const cors = require("micro-cors")();
const { router, get, post } = require("microrouter");

const loginHandler = require("./src/login");
const refreshHandler = require("./src/refresh");
const verifyHandler = require("./src/verify");

module.exports = router(
  post("/login", loginHandler),
  get("/refresh", refreshHandler),
  get("/verify", verifyHandler),
  (req, res) => send(res, 404)
);
