var React = require('react');
var AuthenticatedComponent = require('./AuthenticatedComponent');

export default AuthenticatedComponent(class Home extends React.Component {
  render() {
    return (<h1>Hello Kartik</h1>);
  }
});
