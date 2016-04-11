'use strict';

var React = require('react');
var LoginStore = require('../stores/LoginStore');
var { Route, RouteHandler, Link } = require('react-router');
var AuthService = require('../services/AuthService');
var FlatButton = require('material-ui/lib/flat-button');

export default class AuthenticatedApp extends React.Component {
  constructor() {
    super()
    this.state = this._getLoginState();
  }

  _getLoginState() {
    return {
      userLoggedIn: LoginStore.isLoggedIn()
    };
  }

  componentDidMount() {
    this.changeListener = this._onChange.bind(this);
    LoginStore.addChangeListener(this.changeListener);
  }

  _onChange() {
    this.setState(this._getLoginState());
  }

  componentWillUnmount() {
    LoginStore.removeChangeListener(this.changeListener);
  }

  render() {
    return (
      <div className="container">
        <nav>
          {this.headerItems}
        </nav>
        <br/>
        <RouteHandler/>
      </div>
    );
  }

  logout(e) {
    e.preventDefault();
    AuthService.logout();
  }

  get headerItems() {
    if (!this.state.userLoggedIn) {
      return (
        <div>
          <img src="http://www.buyample.com/assets/img/logo_2_highlight.png" width="100" height="50" />
          <Link to="login"><FlatButton label="Login" primary={true} /></Link>
          <Link to="signup"><FlatButton label="Sign Up" secondary={true} /></Link>
      </div>)
    } else {
      return (
        <div>
          <Link to="home"><FlatButton label="Home" primary={true} /></Link>
          <FlatButton onClick={this.logout} label="Logout" secondary={true} />
      </div>)
    }
  }
}
