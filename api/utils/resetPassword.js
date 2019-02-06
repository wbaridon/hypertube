const argon2 = require('argon2');
const myhash = require('./hash') ;
const mail = require('nodemailer');
const UserManager = require('../models/userManager');

function resetPassword(req, res) {
  return new Promise ((resolve, reject) => {
    global.host = req.headers.origin
    if (req.body.email && req.body.key && req.body.pass1 && req.body.pass2) { // AFTER MAIL
      if (req.body.pass1 === req.body.pass2) {
        afterMail(req.body.email, req.body.key, req.body.pass1, res)
      } else { resolve({status: 0, error: 'password.notCorresponding'}) }
    } else if (req.body.email) { // BEFORE MAIL
        beforeMail(res, req.body.email)
    }
  })
}

passwordHash = (pass, callback) => {
  myhash.hash(pass, res => {
    callback(res);
  })
}

sendMail = user => {
  //console.log(user)
	var tunnel = mail.createTransport ({
		service: 'gmail',
		auth: {
				user: 'matchawb@gmail.com',
				pass: '42camagru'
		}
	})
	passwordHash(user.locale + user.password + user.email + user.userName, hash => {
		var mailOptions = {
			from: 'matchawb@gmail.com',
			to: user.email,
			subject: 'Reset de votre mot de passe',
            text: 'Bonjour , vous avez demande une reinitialisation de votre mot de passe. Veuillez cliquer sur ce lien pour acceder au formulaire de reinitialisation: ' +  global.host + '/forgot?email=' + user.email + '&key=' + hash
        }
		tunnel.sendMail(mailOptions, function(err, info){
			if (err) {
			} else {
			}
		})
	})
}

function afterMail(email, key, newPW, client) {
    UserManager.getUserByMail(email).then(user => {
        passwordHash(user.locale + user.password + email + user.userName, hash => {
          if (hash === key) {
            argon2.hash(newPW).then(hash => {
            UserManager.updateUserField({'email': email}, {'password': hash})
              client.status(200).send('resetPassword.passwordChanged')
            })
          }
          else
            client.status(400).send({error:'reset.HashAndKeyNotCorresponding'})
          })
    }).catch(err => { client.status(400).send({error:"resetPassword.noPasswordChangedAvailable"}) })
}

beforeMail = (client, email) => {
    UserManager.getUserByMail(email).then(res => {
      if (!res)
        client.status(400).send({error:'resetPassword.noUser'})
      else {
        if (res.oauth) { client.status(400).send({error:'resetPassword.notAvailableforOAuthAccount'})}
        else {
          sendMail({
            email: email,
            locale: res.locale,
            userName: res.userName,
            password: res.password
           });
          client.status(200).send('resetPassword.emailSent')
        }
      }
    }).catch(error => { client.status(400).send({error:'resetPassword.noUser'}) })
}

module.exports.reset= resetPassword;
