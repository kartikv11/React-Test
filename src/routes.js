"use strict";

var React = require('react');
var AuthenticatedApp = require('./components/AuthenticatedApp');
var Login = require('./components/Login');
var Signup = require('./components/Signup');
var Home = require('./components/Home');
var LoginActions = require('./actions/LoginActions');

var Router = require('react-router');
var Route = Router.Route;

var routes = (
  <Route handler={AuthenticatedApp}>
    <Route name="login" handler={Login}/>
    <Route name="signup" handler={Signup}/>
    <Route name="home" path="/" handler={Home}/>
  </Route>
);

module.exports = routes;
