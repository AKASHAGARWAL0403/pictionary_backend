const express = require('express');
const router = express.Router();
const RoomAction = require('./actions');

router.post("/" , (req,res) => {
    RoomAction.addRoom(req.body , (err , result) => {
        if(err){
            res.status(err.status).send(err);
        }else{
            res.status(200).send(result);
        }
    })
})

router.post('/add-user', (req,res) => {
    RoomAction.addUserToRoom(req.body , (err , result) => {
        if(err){
            res.status(err.status).send(err);
        }else{
            res.status(200).send(result);
        }
    })
})

module.exports = router;