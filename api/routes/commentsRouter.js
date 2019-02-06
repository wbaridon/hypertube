const express = require('express');
const commentsRouter = express.Router();
const axios = require('axios');
const tokenManager = require('../utils/token');

const MovieManager = require('../models/movieManager');
const UserManager = require('../models/userManager');

commentsRouter
  .post('/add' , function(req, res) {
    tokenManager.decode(req.headers.authorization).then(token => {
      if (req.body.comment.length > 1) {
        let comments = {
            userName: token.user,
            comment: req.body.comment,
            postedOn: Date.now()
          }
        getAvatarLink(token.user).then(avatar => {
          comments.picture = avatar;
          MovieManager.addComment(req.body.idMovie, comments).then(success => {
            MovieManager.getMovie(req.body.idMovie).then(result => {
              res.status(200).send(result);
            }).catch(error => res.status(404).send('errorInTheDb'))
          }).catch(error => res.status(400).json({error: 'addComment.errorInTheDb'}))
        }).catch(error => res.status(400).json({error: 'getAvatarLink.noSuchUser'}))
      } else { res.status(400).json({error: 'addComment.emptyComment'}) }
    }).catch(err => res.status(400).json({ error: 'token.invalidToken' }))
  })
  .post('/delete' , function(req, res) {
    tokenManager.decode(req.headers.authorization).then(token => {
      console.log(req.body)
      // Besoin de l'imdbId, username et comment ... En back on setup le timestamp
      res.status(200).send('A faire')
    }).catch(err => res.status(400).json({ error: 'token.invalidToken' }))
  })

function getAvatarLink(username) {
  return new Promise ((resolve, reject) => {
    UserManager.getUser(username).then(user => {
      resolve(user.picture)
    }).catch(error => reject('getAvatarLink.noSuchUser'))
  })
}
module.exports = commentsRouter;
