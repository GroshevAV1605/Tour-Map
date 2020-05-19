const db = require('../db');
const router = require('express').Router();

router.post("/", (req, res) => {
    let {body} = req;
    
    db.any('INSERT INTO category(name, title, title_en, preset, color) VALUES (${name}, ${title}, ${title_en}, ${preset}, ${color}) RETURNING id', body)
        .then((data)=>{
            res.json(data);      
        })
        .catch(err => res.status(400).json("Error: "+err));
})

router.get("/", (req, res) => {
    db.any('select * from category')
        .then(data=>{
            res.json(data);
        })
        .catch(error=> res.status(400).json("Error: " + error));
})

module.exports = router;