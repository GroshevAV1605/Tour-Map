const uuidv4 = require('uuid').v4; 
const router = require('express').Router();
const db = require('../db');
let crypto = require('crypto');

router.post("/", (req, res) => {
    let {body} = req;
    body.id = uuidv4();
    body.salt = crypto.randomBytes(16).toString('hex')
    body.password_hash = crypto.pbkdf2Sync(body.password, body.salt, 1000, 64, 'sha512').toString('hex');
    body.user_type = 'user';
    body.reg_date = Date.now() / 1000.0;
    console.log(body);
    db.any('select login from map_user')
        .then((data) => {
            if (data.some(el=> el.login.trim() === body.login)){                
                res.status(401).json("Login exist")
            }else{
                db.any('INSERT INTO map_user(id, login, password_hash, salt, name, user_type, reg_date) VALUES (${id}, ${login}, ${password_hash}, ${salt}, ${name}, ${user_type}, to_timestamp(${reg_date})) RETURNING id', body)
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
                    res.status(202).json({cookie: "my_cookie"})
                }
                else{
                    res.status(402).json("Incorrect password")
                }
            }
        })
})

module.exports = router;