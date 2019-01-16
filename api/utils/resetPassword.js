const argon2 = require('argon2');
const myhash = require('./hash') ;
const mail = require('nodemailer');
const UserManager = require('../models/userManager');

function resetPassword(req, res) {
  return new Promise ((resolve, reject) => {
    global.host = req.headers.origin
    if (req.body.email && req.body.key && req.body.pass1 && req.body.pass2) { // AFTER MAIL
      if (req.body.pass1 === req.body.pass2) {
        afterMail(req.body.email, req.body.key, req.body.pass1)
        .then(success => {
          resolve({status: 1, success: 'password.changed'})
        }, error => {
          resolve({status: 0, error: 'password.notCorresponding'})
        })
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

function afterMail(email, key, newPW) {
  return new Promise ((resolve, reject) => {
    UserManager.getUserByMail(email).then(user => {
      if (user) {
        passwordHash(user.locale + user.password + email + user.userName, hash => {
          if (hash === key) {
            argon2.hash(newPW).then(hash => {
            UserManager.updateUserField({'email': email}, {'password': hash})
              resolve('Password changed')
            })
          }
          else
            reject('Hash and key not corresponding')
          })
      }
      else { reject("No password resetting to do.") }
    })
  })
}

beforeMail = (client, email) => {
    UserManager.getUserByMail(email).then(res => {
      if (!res)
        client.send("This user doesn't exists");
      else {
        sendMail({
          email: email,
          locale: res.locale,
          userName: res.userName,
          password: res.password
         });
        client.send('Un email vient de vous etre envoye')
      }
    })
}

module.exports.reset= resetPassword;
