var React = require('react');
var ReactMixin = require('react-mixin');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var Auth = require('../services/AuthService');

var RaisedButton = require('material-ui/lib/raised-button');
var Snackbar = require('material-ui/lib/snackbar');
var Divider = require('material-ui/lib/divider');
var Paper = require('material-ui/lib/paper');
var TextField = require('material-ui/lib/text-field');

const style = {
  marginLeft: 20
};

export default class Signup extends React.Component {

  constructor() {
    super()
    this.state = {
        phone_number: '',
        first_name: '',
        last_name: '',
        email_id: '',
        password: '',
        designation: '',
        team: '',
        manager_phone_number: '',
      signupFailure: false,
      managerPhoneNumberError: '',
      phoneNumberError: '',
      emailIdError: '',
      passwordError: '',
      open :false,
      error: ''
    };
  }

  signupFormIsValid() {
    var formIsValid = true;
    this.state.phoneNumberError = '';
    this.state.managerPhoneNumberError = '';
    this.state.emailIdError = '';
    this.state.passwordError = '';

    var phone_regex = /^[1-9]{1}?\d{9}$/;
    var email_id_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!this.state.phone_number.match(phone_regex)) {
      this.state.phoneNumberError = "Phone Number must have 10-digits";
      formIsValid = false;
      this.setState({phoneNumberError: this.state.phoneNumberError});
    }
    if (!this.state.manager_phone_number.match(phone_regex)) {
      this.state.managerPhoneNumberError = "Manager Phone Number must have 10-digits";
      formIsValid = false;
      this.setState({managerPhoneNumberError: this.state.managerPhoneNumberError});
    }
    if (!this.state.email_id.match(email_id_regex)) {
      this.state.emailIdError = "Enter a valid Email Id";
      formIsValid = false;
      this.setState({emailIdError: this.state.emailIdError});
    }
    if (this.state.password.length < 6) {
      this.state.passwordError= "Password must have atleast 6 letters";
      this.setState({passwordError: this.state.passwordError});
      formIsValid = false;
    }

    return formIsValid;

  }

  signup(e) {
    var that = this;
    e.preventDefault();

    if (!this.signupFormIsValid()) {
      return;
    }

    Auth.signup(this.state)
      .catch(function(err) {
        var apiError = JSON.parse(err.response);
        that.setState({ signupFailure: true,
                        open: true,
                        error: apiError.error.message});
        console.log("Error Signing up", err);
      });
  }

  render() {
    return (
      <div>
        <h1>Signup</h1>
        <Divider />
        <h4>User Details</h4><br/>
          <Paper zDepth={2}>
            <TextField
              id="phone_number"
              valueLink={this.linkState('phone_number')}
              hintText="10-digit Phone Number"
              type="text"
              maxLength="10"
              errorText={this.state.phoneNumberError}
              underlineShow={false}
              style={style}
            />
            <Divider />
            <TextField
              id="email_id"
              valueLink={this.linkState('email_id')}
              hintText="<your_email_id>@buyample.com"
              type="text"
              maxLength="30"
              errorText={this.state.emailIdError}
              underlineShow={false}
              style={style}
            />
            <Divider />
            <TextField
              id="first_name"
              valueLink={this.linkState('first_name')}
              hintText="First Name"
              type="text"
              maxLength="20"
              minLength="1"
              underlineShow={false}
              style={style}
            />
            <Divider />
            <TextField
              id="last_name"
              valueLink={this.linkState('last_name')}
              hintText="Last Name"
              type="text"
              maxLength="20"
              minLength="1"
              underlineShow={false}
              style={style}
            />
            <Divider />
            <TextField
              id="password"
              valueLink={this.linkState('password')}
              hintText="Password"
              type="password"
              errorText={this.state.passwordError}
              underlineShow={false}
              style={style}
            />
        </Paper><br/>
          <h4>Employment Details</h4>
          <Paper>
            <Divider />
            <TextField
              id="designation"
              valueLink={this.linkState('designation')}
              hintText="Designation"
              type="text"
              minLength="3"
              underlineShow={false}
              style={style}
            /><br/>
            <TextField
              id="team"
              valueLink={this.linkState('team')}
              hintText="Team Name (Eg: Tech, Business)"
              type="text"
              minLength="2"
              underlineShow={false}
              style={style}
            /><br/>
            <TextField
              id="manager_phone_number"
              valueLink={this.linkState('manager_phone_number')}
              hintText="Your Manager's phone number"
              type="manager_phone_number"
              errorText={this.state.managerPhoneNumberError}
              maxLength="10"
              underlineShow={false}
              style={style}
            />
          </Paper>
            <br/><br/>
            <RaisedButton label="Submit" primary={true} onClick={this.signup.bind(this)} />
            <br/><br/><br/><br/>
            {this.signupStatusSnackbar}
    </div>
    );
  }

  handleRequestClose() {
    this.setState({
      open: false
    });
  };

  get signupStatusSnackbar() {
    var that = this;
    if (this.state.signupFailure) {
      return (
        <div>
          <Snackbar
          open={this.state.open}
          message={"Signup Failure! " + this.state.error}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose.bind(that)}
        />
      </div>)
    }
  }
}

ReactMixin(Signup.prototype, LinkedStateMixin);
