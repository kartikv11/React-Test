"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router');

var RouterContainer = require('./services/RouterContainer');
var LoginActions = require('./actions/LoginActions');
var routes = require('./routes');

var router = Router.create({routes});
RouterContainer.set(router);

let session_token = localStorage.getItem('session_token');
if (session_token) {
  LoginActions.loginUser(session_token);
}

Router.run(routes,Router.HistoryLocation, function (Handler) {
  ReactDOM.render(<Handler />, document.getElementById('app'));
});
