const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')
const findRemoveSync = require('find-remove')
const API = require('./lib/api')
const crypto = require('./lib/crypto')
const Str = require('@supercharge/strings')
//require("./lib/chats")

function parse(queryString) {
  var query = {};
  var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
}

// index
app.use(cors())
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html')
})
app.listen(80)
// login
app.post('/login', function (request, response) {
  API.send("sendCode", "4", {
      data: {
        phone_number: parse(request.url)["/login?phone_number"],
        send_type: "SMS"
      }
    })
    .then(res => response.send(res))
    .catch(err => response.send({
      status: false,
      status_det: false
    }))
})
// singIn
app.post('/signIn', function (request, response) {
  const url = parse(request.url)

  API.send("signIn", "4", {
      data: {
        phone_code: url["code"],
        phone_code_hash: JSON.parse(url["data"]).data.phone_code_hash,
        phone_number: url["/signIn?phone_number"]
      }
    })
    .then(res => {
      res.status === "OK" && res.status_det === "OK" &&
        crypto.encrypt(res.data.auth, {
          app_version: "MA_2.6.3",
          device_hash: Str.random(32),
          device_model: Str.random(14),
          lang_code: "en",
          system_version: "SDK 25",
          token: "",
          token_type: "Firebase"
        }).then(data_enc => {
          API.send("registerDevice", "4", {
            auth: res.data.auth,
            data_enc: data_enc
          }).then(result => {
            if (result.status === "OK" && result.status_det === "OK")
              response.send(res)
            else response.send({
              status: "false",
              status_det: "OK"
            })
          }).catch(err => console.log(err))
        }).catch(err => console.log(err))
    })
    .catch(err => response.send({
      status: "false",
      status_det: "false"
    }))
})

//clean tmp directory and logs
findRemoveSync(__dirname + '/lib/tmp', {
  dir: "*",
  files: "*.*"
})
findRemoveSync(__dirname + '/lib/Crypto', {
  extensions: ['.log']
})