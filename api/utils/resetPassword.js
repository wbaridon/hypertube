const argon2 = require('argon2');
const myhash = require('./hash') ;
const mail = require('nodemailer');
const UserManager = require('../models/userManager');

function resetPassword(req, res) {
  return new Promise ((resolve, reject) => {
    global.host = req.headers.origin
    if (req.body.email && req.body.key && req.body.pass1 && req.body.pass2) { // AFTER MAIL
      if (req.body.pass1 === req.body.pass2) {
        afterMail(res, req.body.email, req.body.key, req.body.pass1)
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
  console.log(user)
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

afterMail = (client, email, key, newPW) => {

    model.userTimestampPasswordFromEmail(email, (err, res) => { //Mail existing in DB with associated timestampPassword
        if (err) throw err;
        else if (res[0].timestampPassword !== 0) {
            user = res[0];
            passwordHash(user.timestampPassword + user.password + email, hash => {
                if (hash === key) {
                    model.updateUser(res[0].id, "timestampPassword", 0)
                    argon2.hash(newPW).then(hash => {
                        model.updateUser(res[0].id, "password", hash)
                        client.send('Password changed')
                    })
                }
                else
                  client.send('Hash and key not corresponding')
            })
        }
        else {
            client.send("No password resetting to do.")
        }
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
