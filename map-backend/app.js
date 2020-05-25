const express = require('express');
const cors = require('cors');
require('dotenv').config();
const uuid = require('uuid');
const fileUpload = require('express-fileupload');

var app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded())
app.use(fileUpload({createParentPath: true, useTempFiles:true}));
app.use(express.static("media"))

app.get('/', (req, res)=>{
    res.send('Hello World!')
})

const markersRouter = require("./routes/markers");
const catRouter = require("./routes/categories");
const userRouter = require("./routes/user");
app.use("/markers", markersRouter);
app.use("/categories", catRouter);
app.use("/users", userRouter);

app.listen(process.env.PORT || 5000, ()=>{
    console.log('Server started...');
    
})