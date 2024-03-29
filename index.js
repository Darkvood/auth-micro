require("dotenv").config();

const { send } = require("micro");
const cors = require("micro-cors")();
const { router, get, post } = require("microrouter");

const loginHandler = require("./src/login");
const refreshHandler = require("./src/refresh");
const verifyHandler = require("./src/verify");

module.exports = cors(
  router(
    post("/login", loginHandler),
    post("/refresh", refreshHandler),
    get("/verify", verifyHandler),
    (req, res) => send(res, 404)
  )
);
