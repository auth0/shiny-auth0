var express = require('express');
var passport = require('passport');
var httpProxy = require('http-proxy');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn()
var router = express.Router();

var proxy = httpProxy.createProxyServer({
  target: {
      host: process.env.SHINY_HOST,
      port: process.env.SHINY_PORT
    }
});

proxy.on('error', function(e) {
  console.log('Error connecting');
  console.log(e);
});

proxy.on('proxyReq', function(proxyReq, req, res, options) {
  proxyReq.setHeader('x-auth0-nickname', req.user.nickname);
  proxyReq.setHeader('x-auth0-user_id', req.user.user_id);
  proxyReq.setHeader('x-auth0-email', req.user.email);
  proxyReq.setHeader('x-auth0-name', req.user.name);
  proxyReq.setHeader('x-auth0-picture', req.user.picture);
  proxyReq.setHeader('x-auth0-locale', req.user.locale);
});

/* Proxy all requests */
router.all(/.*/, ensureLoggedIn, function(req, res, next) {
  proxy.web(req, res);
});

module.exports = router;
