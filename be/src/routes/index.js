const todox = require("./todox");
// ...

module.exports = route = function (app) {
  app.use(`/api/todox`, todox);
};
