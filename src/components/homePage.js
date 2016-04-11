"use strict";

var React = require('react');
var Router  = require('react-router');
var RaisedButton = require('material-ui/lib/raised-button');
var Link = Router.Link;

const style = {
  margin: 12,
};

var Home = React.createClass({
  render: function() {
    return (
      <div className="jumbotron">
        <h1>React Bridge</h1>
        <p>React, React Router, and Flux</p>
        <Link to="about"><RaisedButton label="Learn More" primary={true} style={style} /></Link>
      </div>
    );
  }
});

module.exports = Home;
