//require tools
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const allRestaurant = require("./restaurant.json");

//server setting
const port = 3000;

//handlebars setting to express engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//using st\atic files in the public
app.use(express.static("public"));

//index routes setting
app.get("/", function(req, res) {
  res.render("index", { restaurant: allRestaurant.results });
});

//show routes setting
app.get("/restaurants/:restaurant_name", function(req, res) {
  console.log("req.params", req.params.restaurant_name);
  const restaurantId = allRestaurant.results.find(function(restaurant) {
    return restaurant.id.toString() === req.params.restaurant_name;
  });
  res.render("show", { restaurant: restaurantId });
});

//search bar setting
app.get("/search", function(req, res) {
  console.log("req.query", req.query.keyword);

  const keyword = req.query.keyword;
  const input = allRestaurant.results.filter(function(restaurant) {
    if (
      restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
      restaurant.category.toLowerCase().includes(keyword.toLowerCase())
    ) {
      return restaurant;
    }
  });
  res.render("index", { restaurant: input, keywords: keyword });
});

//starting and listen on the express server
app.listen(port, function() {
  console.log(`Express is running on :http://localhost:${port}`);
});
