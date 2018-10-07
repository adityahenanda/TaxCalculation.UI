var generalRoutes = require("./general");
var masterRoutes = require("./master");
var publicRoutes = require("./public");


export default [].concat(publicRoutes, generalRoutes, masterRoutes);



