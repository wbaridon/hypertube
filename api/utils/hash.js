/*******************************************************************************
module.exports.hash(String, (hash) => {})
module.exports.verify(String, String, (ok) => {})
*******************************************************************************/
const argon2 = require('argon2');
const MAX_SIZE = 32
const EFFICTIVE_SIZE = 22
/******************************************************************************/

fun_hash = (str, callback) => {
    argon2.hash(str, {hashLength: MAX_SIZE / 2, salt: Buffer.from("lolilolilolil", 'utf8')}).then((hash => {
        hash = hash.replace(/\+/g, 'A');
        hash = hash.slice(hash.length - EFFICTIVE_SIZE)
        callback(hash);
    }))
}

fun_verify = (str, hash, callback) => {
    fun_hash(str, hash2 => {
        callback (hash2 === hash)
    })
}

module.exports.hash = fun_hash;
module.exports.verify = fun_verify;
