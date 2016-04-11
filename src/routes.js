"use strict";

var React = require('react');
var AuthenticatedApp = require('./components/AuthenticatedApp');
var Login = require('./components/Login');
var Signup = require('./components/Signup');
var Home = require('./components/Home');
var LoginActions = require('./actions/LoginActions');

var Router = require('react-router');
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;
var NotFoundPage = require('./components/NotFoundPage');

var routes = (
  <Route name="app" path="/" handler={AuthenticatedApp}>
    <DefaultRoute handler={DefaultRoute} />
    <Route name="login" handler={Login}/>
    <Route name="signup" handler={Signup}/>
    <Route name="home" path="/" handler={Home}/>
    <NotFoundRoute handler={NotFoundPage} />
  </Route>
);

module.exports = routes;
