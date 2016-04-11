"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router');

var Route = Router.Route;
var RouterContainer = require('./services/RouterContainer');
var LoginActions = require('./actions/LoginActions');
var AuthenticatedApp = require('./components/AuthenticatedApp');
var Login = require('./components/Login');
var Signup = require('./components/Signup');
var Home = require('./components/Home');


var routes = (
  <Route handler={AuthenticatedApp}>
    <Route name="login" handler={Login}/>
    <Route name="signup" handler={Signup}/>
    <Route name="home" path="/" handler={Home}/>
  </Route>
);

var router = Router.create({routes});
RouterContainer.set(router);

let session_token = localStorage.getItem('session_token');
if (session_token) {
  LoginActions.loginUser(session_token);
}

router.run(function (Handler) {
  ReactDOM.render(<Handler />, document.getElementById('app'));
});
