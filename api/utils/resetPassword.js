const argon2 = require('argon2');
const myhash = require('./hash') ;
const mail = require('nodemailer');

function resetPassword(req, res) {
  return new Promise ((resolve, reject) => {
    global.host = req.headers.origin
    if (req.body.email && req.body.key && req.body.pass1 && req.body.pass2) { // AFTER MAIL
      if (req.body.pass1 === req.body.pass2) {
        afterMail(res, req.body.email, req.body.key, req.body.pass1)
      } else { resolve({status: 0, error: 'password.notCorresponding'}) }
    } else if (req.body.email && req.body.login) { // BEFORE MAIL
        beforeMail(res, req.body.email, req.body.login)
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
	passwordHash(user.timestampPassword + user.password + user.email, hash => {
		var mailOptions = {
			from: 'matchawb@gmail.com',
			to: user.email,
			subject: 'Reset de votre mot de passe',
            text: 'Bonjour , vous avez demande une reinitialisation de votre mot de passe. Veuillez cliquer sur ce lien pour acceder au formulaire de reinitialisation: ' +  global.host + '/login/reset?email=' + user.email + '&key=' + hash
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

beforeMail = (client, email, login) => {
    model.userTimestampPasswordFromEmailLogin(email, login, (err, res) => { //Mail + login existing in DB with associated timestampPassword
        if (err) throw err;
        else if (!res[0])
            client.send("This user doesn't exists");
        else {
            let timestamp = Date.now()
            model.updateUser(res[0].id, "timestampPassword", timestamp)
            sendMail({
                timestampPassword: timestamp,
                password: res[0].password,
                email: email
            });
            client.send('Un email vient de vous etre envoye')
        }
    })
}

module.exports.resetPassword = resetPassword;
