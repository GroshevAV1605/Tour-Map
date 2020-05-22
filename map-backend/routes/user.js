const uuidv4 = require('uuid').v4; 
const router = require('express').Router();
const db = require('../db');
const path = require('path');
let crypto = require('crypto');

router.post("/", (req, res) => {
    let {body} = req;
    console.log(req.body.password);

    body.id = uuidv4();
    body.salt = crypto.randomBytes(16).toString('hex')
    body.password_hash = crypto.pbkdf2Sync(body.password, body.salt, 1000, 64, 'sha512').toString('hex');
    body.user_type = 'user';
    body.reg_date = Date.now() / 1000.0;
    console.log(body);
    db.any('SELECT login FROM map_user')
        .then((logins) => {
            if (logins.some(el=> el.login.trim() === body.login)){                
                res.status(401).json("Login exist")
            }else{
                
                db.any('INSERT INTO map_user(id, login, password_hash, salt, name, user_type, reg_date) VALUES (${id}, ${login}, ${password_hash}, ${salt}, ${username}, ${user_type}, to_timestamp(${reg_date})) RETURNING id', body)
                    .then(ret => {
                        res.status(200).json(ret);
                    })
                    .catch(err => res.status(400).json("Error: "+err))
            }          
            
        })
        .catch(err => res.status(400).json("Error: "+err));
    
})

router.post("/auth", (req, res) => {
    let {body} = req;
    db.any('select * from map_user')
        .then(data => {
            
            let auth_data = data.find(el => el.login.trim() === body.login)
            if (auth_data === undefined){
                res.status(402).json("Incorrect login")
            }
            else{
                
                input_hash = crypto.pbkdf2Sync(body.password, auth_data.salt, 1000, 64, 'sha512').toString('hex');
                if(input_hash === auth_data.password_hash){
                    res.status(202).json({id: auth_data.id, photo: auth_data.photo, name:auth_data.name, reg_date:auth_data.reg_date})
                }
                else{
                    res.status(402).json("Incorrect password")
                }
            }
        })
})

router.get("/getById/:id", (req, res) => {
    let {id} = req.params;
    id = id.replace(/"/g, "");
    
    db.one('SELECT * FROM map_user WHERE id = $1', id)
        .then(data => {
            res.json({id: data.id, photo: data.photo, name: data.name, reg_date: data.reg_date})
            return true;
        })
        .catch(err => {
            res.status(400).json("Error:" + err);
            return false;
        })
})

router.post("/changeName", (req, res) => {
    let {body} = req;
    
    db.none('UPDATE map_user SET name=$1 WHERE id=$2', [body.newName, body.id])
        .then(() => res.json("OK"))
        .catch(err => res.status(400).json("Error: " + err));
})

router.post("/changePass", (req, res) => {
    let {body} = req;
    let salt = crypto.randomBytes(16).toString('hex')
    let password_hash = crypto.pbkdf2Sync(body.password, salt, 1000, 64, 'sha512').toString('hex');

    db.none('UPDATE map_user SET password_hash=$1, salt=$2 WHERE id=$3', [password_hash, salt, body.id])
        .then(() => res.json("OK"))
        .catch(err => res.status(400).json("Error: " + err))
})

router.post("/changeAvatar", (req, res) => {
    let {body} = req;
    let img = req.files.imagefile;
    img.mv(path.join(__dirname, `../media/userpicks/${body.id}/${img.name}`), err => {
        if(err){
            console.log(err);
            return res.status(400).json("Error: " + err);
        }
    })

    let imgSrc = process.env.PUBLIC_URL + `/userpicks/${body.id}/${img.name}`;

    db.none('UPDATE map_user SET photo=$1 where id=$2', [imgSrc, body.id])
        .then(() => {res.json({imgSrc})})
        .catch(err => res.status(400).json("Error: " + err))

})

module.exports = router;