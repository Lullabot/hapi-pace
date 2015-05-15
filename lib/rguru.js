'use strict'

var tokenURL = 'https://api.resourceguruapp.com/'
var tokenOptions = {
  'grant_type': 'password',
  'username': 'info@lullabot.com',
  'password': 'P2im8hdLURoUXZfWptupuWTeVuxfQg',
  'client_id': '2461eab78ad7f6056f1fdbb0a73f132456c0b23f0aa5b4dd95aa8af84320d5dc',
  'client_secret': '67d99aa1c718f2311f9075ea7539f4e65cd284d8e78f39b2a0bb73080a2bf153'
}

var OAuth2 = require('oauth').OAuth2
var oauth2 = new OAuth2(tokenOptions.client_id,
  tokenOptions.client_secret,
  tokenURL,
  null,
  'oauth/token',
  null)
var request = require('superagent')

require('superagent-oauth')(request)

var rguru = {}

module.exports.getProjects = function () {
  oauth2.getOAuthAccessToken('', tokenOptions, function (e, access_token, refresh_token, results) {
    console.log(access_token)
    request
      .get('https://api.resourceguruapp.com/v1/lullabot/projects')
      .sign(oauth2, access_token)
      .end(function (err, res) {
        if (err) console.log(err)
        console.dir(res.body)
      })
  })
}

module.exports.api = rguru
