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
            }).catch(error => res.status(404).send({error:'errorInTheDb'}))
          }).catch(error => res.status(400).json({error: 'addComment.errorInTheDb'}))
        }).catch(error => res.status(400).json({error: 'getAvatarLink.noSuchUser'}))
      } else { res.status(400).json({error: 'addComment.emptyComment'}) }
    }).catch(err => res.status(400).json({ error: 'token.invalidToken' }))
  })
  .post('/delete' , function(req, res) {
    tokenManager.decode(req.headers.authorization).then(token => {
      let idMovie = req.body.idMovie;
      let idComment = req.body.idComment;
      userIsAuthorComment(idMovie, token.user, idComment).then(isAuthor => {
        MovieManager.deleteComment(idMovie, idComment)
            .then(resolve => {
              res.status(200).send(resolve) })
            .catch(error => { console.log(error)})
      }).catch(error => res.status(400).send(error))
    }).catch(err => { res.status(400).json({ error: 'token.invalidToken' })})
  })

function getAvatarLink(username) {
  return new Promise ((resolve, reject) => {
    UserManager.getUser(username).then(user => {
      resolve(user.picture)
    }).catch(error => reject({error: 'getAvatarLink.noSuchUser'}))
  })
}

function userIsAuthorComment(idMovie, user, idComment) {
  return new Promise ((resolve, reject) => {
    MovieManager.getComment(idMovie, idComment)
      .then(result => {
        if (result.userName === user) {
          resolve()
        } else { reject({error: 'deleteComment.userIsNotAuthor'}) }
      }).catch(error => reject(error))
  })
}
module.exports = commentsRouter;
