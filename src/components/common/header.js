import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-light">
        <ul className="nav navbar-nav">
          <li className="nav-item"><Link to="signin">Sign in</Link></li>
          <li className="nav-item"></li>
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated, token: state.auth.token };
}

export default connect(mapStateToProps)(Header);
