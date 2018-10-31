const express = require('express');
const userRouter = express.Router();

userRouter
    .get('/', (req,res) => {
        res.json({'test':'test'})
    })
    .get('/2', (req,res) => {
        res.json({'test':'test'})
    })

module.exports = userRouter;
