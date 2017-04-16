import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
  renderHeader() {
    if(this.props.authenticated) {
      return (
        <ul className="nav navbar-nav">
          <li className="nav-item"><Link className="nav-link" to="signout">Sign Out</Link></li>
        </ul>
      );
    } 
    return (
        <ul className="nav navbar-nav">
          <li className="nav-item"><Link className="nav-link" to="signin">Sign In</Link></li>
          <li className="nav-item"><Link className="nav-link" to="signup">Sign Up</Link></li>
        </ul>
    );
  }
  render() {
    return (
      <nav className="navbar navbar-light">
        <Link to="/" className="navbar-brand">Redux Auth</Link>
        {this.renderHeader()}
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated, token: state.auth.token };
}

export default connect(mapStateToProps)(Header);
