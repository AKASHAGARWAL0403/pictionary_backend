const express = require('express');
const router = express.Router();
const UserAction = require('./actions');

router.post("/" , (req,res) => {
    UserAction.addUser(req.body , (err , result) => {
        if(err){
            res.status(err.status).send(err);
        }else{
            res.status(200).send(result);
        }
    })
})

module.exports = router;