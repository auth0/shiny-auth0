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

proxy.on('upgrade', function (req, socket, head) {
  proxy.ws(req, socket, head);
});

/* Proxy all requests */
router.all(/.*/, ensureLoggedIn, function(req, res, next) {
  proxy.web(req, res);
});



module.exports = router;
