const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
    res.send("Bem-vindo(a) ao MovieFlix. Escolha seu filme por categoria");    
});

module.exports = router;
