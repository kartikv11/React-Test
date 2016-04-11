"use strict";

var React = require('react');
var Router  = require('react-router');
var Link = Router.Link;
var FlatButton = require('material-ui/lib/flat-button');

const style = {
  margin: 12,
};

var Header = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img width="60" height="60" src="http://www.buyample.com/assets/img/logo-small.png" />
          </Link>
          <ul className="nav navbar-nav">
            <li><Link to="app"><FlatButton label="Home" style={style} /></Link></li>
            <li><Link to="about"><FlatButton label="About" style={style} /></Link></li>
          </ul>
        </div>
      </nav>
    );
  }
});

module.exports = Header;
