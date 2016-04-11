var AppDispatcher = require('../dispatcher/appDispatcher');
var {LOGIN_USER, LOGOUT_USER} = require('../constants/LoginConstants');
var RouterContainer = require('../services/RouterContainer');

export default {
  loginUser: (session_token) => {
    var savedSessionToken = localStorage.getItem('session_token');

    if (savedSessionToken !== session_token) {
      var nextPath = RouterContainer.get().getCurrentQuery().nextPath || '/';

      RouterContainer.get().transitionTo(nextPath);
      localStorage.setItem('session_token', session_token);
    }

    AppDispatcher.dispatch({
      actionType: LOGIN_USER,
      session_token: session_token
    });
  },
  logoutUser: () => {
    RouterContainer.get().transitionTo('/login');
    localStorage.removeItem('session_token');
    AppDispatcher.dispatch({
      actionType: LOGOUT_USER
    });
  }
}
