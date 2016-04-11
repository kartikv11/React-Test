var {LOGIN_USER, LOGOUT_USER} = require('../constants/LoginConstants');
var BaseStore = require('./BaseStore');


class LoginStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this))
    // this._user = null;
    this._session_token = null;
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case LOGIN_USER:
        this._session_token = action.session_token;
        // this._user = jwt_decode(this._jwt);
        this.emitChange();
        break;
      case LOGOUT_USER:
        // this._user = null;
        this._session_token = null;
        this.emitChange();
        break;
      default:
        break;
    };
  }

  get user() {
    return this._user;
  }

  get session_token() {
    return this._session_token;
  }

  isLoggedIn() {
    return !!this._session_token;
  }
}

export default new LoginStore();
