var React = require('react');
var ReactMixin = require('react-mixin');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var Auth = require('../services/AuthService');

var Card = require('material-ui/lib/card/card');
var CardActions = require('material-ui/lib/card/card-actions');
var CardTitle = require('material-ui/lib/card/card-title');
var FlatButton = require('material-ui/lib/flat-button');
var CardText = require('material-ui/lib/card/card-text');
var Snackbar = require('material-ui/lib/snackbar');
var TextField = require('material-ui/lib/text-field');

export default class Login extends React.Component {

  constructor() {
    super()
    this.state = {
      phone_number: '',
      password: '',
      open: false,
      loginFailure: false,
      phoneNumberError: '',
      passwordError: '',
      error: ''
    };
  }

  loginFormIsValid() {
    var formIsValid = true;
    this.state.phoneNumberError = '';
    this.state.passwordError = '';

    var phone_regex = /^[1-9]{1}?\d{9}$/;

    if (!this.state.phone_number.match(phone_regex)) {
      this.state.phoneNumberError = "Phone Number must have 10-digits";
      formIsValid = false;
      this.setState({phoneNumberError: this.state.phoneNumberError});
    }
    if (this.state.password.length < 6) {
      this.state.passwordError= "Password must have atleast 6 letters";
      this.setState({passwordError: this.state.passwordError});
      formIsValid = false;
    }

    return formIsValid;

  }

  login(e) {
    var that = this;
    e.preventDefault();

    if (!this.loginFormIsValid()) {
      return;
    }
    Auth.login(this.state.phone_number, this.state.password)
      .catch(function(err) {
        var apiError = JSON.parse(err.response);
        that.setState({loginFailure: true,
                        open: true,
                        error: apiError.error.message});
        console.log("Error logging in", err);
      });
  }

  render() {
    return (
      <div className="row">
    <div className="col-xs-12
                col-sm-8
                col-md-6
                col-lg-4">
        <div className="box">
        <Card>
          <CardTitle title="Login" />
          <CardText>
            <TextField
              id="phone_number"
              valueLink={this.linkState('phone_number')}
              hintText="10-digit Phone Number"
              floatingLabelText="Phone Number"
              type="text"
              maxLength="10"
              errorText={this.state.phoneNumberError}
            /><br/>
              <TextField
                id="password"
                valueLink={this.linkState('password')}
                hintText="Password"
                floatingLabelText="Password"
                type="password"
                errorText={this.state.passwordError}
              />
        </CardText>
          <CardActions>
            <FlatButton label="Submit" onClick={this.login.bind(this)} />
          </CardActions>
        </Card>
        </div>
        {this.loginStatusSnackbar}
      </div>
  </div>
    );
  }

  handleRequestClose() {
    this.setState({
      open: false
    });
  };

  get loginStatusSnackbar() {
    var that = this;
    if (this.state.loginFailure) {
      return (
        <div>
          <Snackbar
          open={this.state.open}
          message={"Login Failure! " + this.state.error}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose.bind(that)}
        />
      </div>)
    }
  }
}

ReactMixin(Login.prototype, LinkedStateMixin);
