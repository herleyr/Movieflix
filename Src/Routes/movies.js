const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
    res.send("Bem-vindo(a) ao MovieFlix. Confira sua lista de filmes");    
});

module.exports = router;
