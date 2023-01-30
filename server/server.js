const express = require("express");
const models = require("./models");
const expressGraphQL = require("express-graphql");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const schema = require("./schema/schema");

const app = express();

// Replace with your mongoLab URI
// username : khi, password: AEpEgAfmv4PHsXhj, my ip address: 110.35.135.216/32
const MONGO_URI =
  "mongodb+srv://est:2ssPEA35wSMPgFbV@cluster0.s02x9xr.mongodb.net/?retryWrites=true&w=majority";
if (!MONGO_URI) {
  throw new Error("You must provide a MongoLab URI");
}
mongoose.set("strictQuery", false);
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
  .once("open", () => console.log("Connected to MongoLab instance."))
  .on("error", (error) => console.log("Error connecting to MongoLab:", error));

app.use(bodyParser.json());
app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

const webpackMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const webpackConfig = require("../webpack.config.js");
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
