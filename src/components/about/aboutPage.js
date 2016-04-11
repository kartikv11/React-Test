"use strict";

var React = require('react');

var About = React.createClass({
  render: function() {
    return (
      <div>
        <h1>About</h1>
        <p>This app uses:</p>
        <ul>
          <li>React</li>
          <li>Flux</li>
        </ul>
      </div>
    );
  }
});

module.exports = About;
