var request = require('reqwest');
var when = require('when');
var {LOGIN_URL, SIGNUP_URL} = require('../constants/LoginConstants');
var LoginActions = require('../actions/LoginActions');

class AuthService {

  login(phone_number, password) {
    var login_status = this.handleAuth(when(request({
      url: LOGIN_URL,
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      data: {
        user:{
          phone_number, password
        }
      }
    })));
    return login_status;
  }

  logout() {
    LoginActions.logoutUser();
  }

  signup(params) {

    return this.handleAuth(when(request({
      url: SIGNUP_URL,
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      data: {
        user: {
          phone_number: params.phone_number,
          first_name: params.first_name,
          last_name: params.last_name,
          email_id: params.email_id,
          password: params.password
        },
        employee: {
          designation: params.designation,
          team: params.team,
          manager_phone_number: params.manager_phone_number
        }
      }
    })));
  }

  handleAuth(loginPromise) {
    return loginPromise
      .then(function(response) {
        var session_token = response.payload.employee.session_token;
        LoginActions.loginUser(session_token);
        return true;
      });
  }
}

export default new AuthService()
