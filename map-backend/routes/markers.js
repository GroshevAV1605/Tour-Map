const uuidv4 = require('uuid').v4; 
const router = require('express').Router();
const path = require('path');
const db = require('../db');
require('dotenv').config();

router.get("/:category", (req, res) => {
    let category;
    db.one("SELECT * FROM category WHERE name = ${category}", req.params)
        .then(data => category = data)
        .catch(err =>  res.status(400).json("Error: " + err))
    
    db.any("SELECT * FROM markers WHERE category_id=${category_id}", category)
        .then(data => res.json(data))
        .catch(err => res.status(400).json("Error: " + err))
})

router.get("/userMarkers/:id", (req, res) => {
    let {id} = req.params;
    
    db.any("SELECT * FROM marker WHERE creator_id=$1", id)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json("Error: " + err))
})

router.get("/", (req, res) => {
    db.any("SELECT * FROM marker")
        .then(data => res.json(data))
        .catch(err => res.status(400).json("Error: " + err))
})

router.post("/", (req, res) => {
    let {body} = req;
    let ID = uuidv4();
    let dataToSave = Object.assign({}, body);
    dataToSave.id = ID;
    dataToSave.images = [];

    if(req.files !== null){

        let files = req.files.imagefile;

        if(Array.isArray(files)){
            files.map(file => {
                file.mv(path.join(__dirname, `../media/${ID}/${file.name}`), err => {
                    if(err) {
                        console.log(err);
                        return res.status(500).send(err);
                    }
                })
                dataToSave.images.push(process.env.PUBLIC_URL+`/${ID}/${file.name}`);
            })
        }
        else{
            files.mv(path.join(__dirname, `../media/${ID}/${files.name}`), err => {
                if(err) {
                    console.log(err);
                    return res.status(500).send(err);
                }
            })
            dataToSave.images.push(process.env.PUBLIC_URL+`/${ID}/${files.name}`);
        }

        
    }

    console.log(dataToSave);
    

    db.none('INSERT INTO marker(id, title, title_en, latitude, longitude, description, description_en, images, creator_id, category_id) VALUES (${id}, ${title}, ${title_en}, ${latitude}, ${longitude}, ${description}, ${description_en}, ${images}, ${creator_id}, ${category_id})', dataToSave)
        .then(() => res.json("OK"))
        .catch(err => res.status(400).json("Error" + err))

})

module.exports = router;
