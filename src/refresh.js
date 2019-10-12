const { send } = require("micro");

module.exports = async (req, res) => {
  return send(res, 500);
};
