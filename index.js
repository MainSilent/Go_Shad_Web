const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const findRemoveSync = require('find-remove')
const API = require('./lib/api')
const crypto = require('./lib/crypto')
const Str = require('@supercharge/strings')

function parse(queryString) {
  var query = {};
  var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
}

const app = express()
app.use(express.static(path.join(__dirname, 'build')))
app.use(cors())

// index
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
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
              status_det: "false"
            })
          }).catch(err => console.log(err))
        }).catch(err => console.log(err))
    })
    .catch(err => response.send({
      status: "false",
      status_det: "false"
    }))
})
// chats
app.post('/chats', function (request, response) {
  const auth = parse(request.url)["/chats?auth"]
  API.send("getChats", "4", {
    auth: auth
  }).then(res => {
    crypto.decrypt(auth, res.data_enc).then(res => {
      response.send(JSON.parse(res))
    }).catch(err => response.send(false))
  }).catch(err => response.send(false))
})
// messages
app.post('/messages', function (request, response) {
  const url = parse(request.url)
  const auth = url["/messages?auth"]

  crypto.encrypt(auth, {
    middle_message_id: url['msg_id'],
    object_guid: url['object_guid']
  }).then(data_enc => {
    API.send("getMessagesInterval", "4", {
      auth: auth,
      data_enc: data_enc
    }).then(res => {
      crypto.decrypt(auth, res.data_enc).then(res => {
        response.send(JSON.parse(res))
      }).catch(err => response.send(false))
    }).catch(err => response.send(false))
  }).catch(err => response.send(false))
})
// getUrl
app.post('/getUrl', function (request, response) {
  const url = parse(request.url)
  const auth = url["/getUrl?auth"]

  crypto.encrypt(auth, {
      access_token: url['access_token'],
      live_id: url['live_id']
  }).then(data_enc => {
      API.send("getLivePlayUrl", "4", {
          auth: auth,
          data_enc: data_enc
      }).then(res => {
          crypto.decrypt(auth, res.data_enc).then(res => {
              response.send(JSON.parse(res))
          }).catch(err => response.send(false))
      }).catch(err => response.send(false))
  }).catch(err => response.send(false))
})

//clean tmp directory and logs
findRemoveSync(__dirname + '/lib/tmp', {
  dir: "*",
  files: "*.*"
})
findRemoveSync(__dirname + '/lib/Crypto', {
  extensions: ['.log']
})