const express = require("express");
const bodyparser = require("body-parser");
const categoryRoutes = require("./Src/Routes/category");
const cors = require("cors");
const moviesRoutes = require("./Src/Routes/movies")

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000
app.use(bodyparser.json());

app.use("/category", categoryRoutes);
app.use("/movies", moviesRoutes);

app.listen(PORT, () => {
    console.log('server running on http://localhost:${PORT}/')
});