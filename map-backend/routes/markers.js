const uuidv4 = require('uuid').v4; 
const router = require('express').Router();
const db = require('../db');

router.get("/:category", (req, res) => {
    let category;
    db.one("SELECT * FROM category WHERE name = ${category}", req.params)
        .then(data => category = data)
        .catch(err => res.status(400).json("Error: " + err))
    
    db.any("SELECT * FROM markers WHERE category_id=${category_id}", category)
        .then(data => res.json(data))
        .catch(err => res.status(400).json("Error: " + err))
})

router.get("/", (req, res) => {
    db.any("SELECT * FROM markers")
        .then(data => res.json(data))
        .catch(err => res.status(400).json("Error: " + err))
})

router.post("/", (req, res) => {
 
})

module.exports = router;