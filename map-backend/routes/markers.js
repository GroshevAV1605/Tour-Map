const uuidv4 = require('uuid').v4; 
const router = require('express').Router();
const cloudinary = require('cloudinary');
const path = require('path');
const db = require('../db');
require('dotenv').config();

cloudinary.config({
    cloud_name: "dfqq2woem",
    api_key: "728332241127315",
    api_secret: 'ILVn8IVxNLflAsRgOUcRU0s7K0w'
})

router.get("/:category", (req, res) => {
    let category;
    db.one("SELECT * FROM category WHERE name = ${category}", req.params)
        .then(data => category = data)
        .catch(err =>  res.status(400).json("Error: " + err))
    
    db.any("SELECT * FROM markers WHERE category_id=${category_id}", category)
        .then(data => res.json(data))
        .catch(err => res.status(400).json("Error: " + err))
})

router.get("/deleteMarker/:id", (req, res) => {
    let {id} = req.params;
    db.none("DELETE FROM marker WHERE id=$1", [id])
        .then(res.json("OK"))
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

router.get("/markerComments/:id", (req, res) => {
    let {id} = req.params;
    db.any("SELECT u.name, u.photo, c.id, c.comment_text, c.grade, c.com_date, c.marker_id, c.user_id, c.images FROM map_user u, comment c WHERE c.user_id=u.id AND c.marker_id=$1", [id])
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json("Error: " + err))
})

router.post("/newComment", (req, res) => {
    let {body} = req;
    body.com_date = Date.now() / 1000.0;
    db.none("INSERT INTO comment(comment_text, grade, com_date, marker_id, user_id) VALUES (${comment}, ${rating}, to_timestamp(${com_date}), ${marker_id}, ${user_id})", body)
        .then(() => {
            db.any("SELECT u.name, u.photo, c.id, c.comment_text, c.grade, c.com_date, c.marker_id, c.user_id, c.images FROM map_user u, comment c WHERE c.user_id=u.id AND c.marker_id=$1", [body.marker_id])
                .then(data => {
                    res.json(data);
                })
                .catch(err => res.status(400).json("Error: " + err))
        })
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
                cloudinary.v2.uploader.upload(file, {folder:ID}, (error, result) => {
                    if(error){
                        return res.status(500).json(error);
                    }
                    dataToSave.images.push(result.url);
                })
            })
        }
        else{
            cloudinary.v2.uploader.upload(files, {folder:ID}, (error, result) => {
                if(error){
                    return res.status(500).json(error);
                }
                dataToSave.images.push(result.url);
            })
        }

        
    }

    console.log(dataToSave);
    

    db.none('INSERT INTO marker(id, title, title_en, latitude, longitude, description, description_en, images, creator_id, category_id) VALUES (${id}, ${title}, ${title_en}, ${latitude}, ${longitude}, ${description}, ${description_en}, ${images}, ${creator_id}, ${category_id})', dataToSave)
        .then(() => res.json("OK"))
        .catch(err => res.status(400).json("Error" + err))

})

module.exports = router;
