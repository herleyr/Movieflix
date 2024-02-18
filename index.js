const express = require("express");
const bodyparser = require("body-parser");
const categoryRoutes = require("./Src/Routes/category")
const moviesRoutes = require("./Src/Routes/movies")

const app = express();

app.use(bodyparser.json());

app.use("/category", categoryRoutes);
app.use("/movies", moviesRoutes);

app.listen(3000, () => {
    console.log('server running on http://localhost:3000/')
});