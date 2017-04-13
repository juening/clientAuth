import React, { Component } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { browserHistory } from 'react-router';

import * as actions from '../../actions';

class Signin extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { user: {}, errors:{} };
    this.onChange = this.onChange.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  onChange(event) {
    const field = event.target.name;
    let user = this.state.user;
    user[field] = event.target.value;
    return this.setState({ user:user })
  }

  formValid(){
    let formIsValid = true;
    let error = {};
    if(!this.state.user.password || this.state.user.password.length < 6 ) {
      formIsValid = false;
      error.password = "Password must be at least 6 characters."
    }
    this.setState({ errors: error });
    return formIsValid;
  }

  redirect() {
    toastr.success('Sign in success!');
    browserHistory.push('feature');
  }

  signIn(event) {
    event.preventDefault();
    if(!this.formValid()){
      return;
    }
    console.log(this.props);
    this.props.signInUser(this.state.user)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
      });
  }

  render() {
    let wrapperClass = 'form-group';
    return (
      <form>
        <h1>Sign In Form</h1>
        <div className={wrapperClass} >
          <label htmlFor="email">Email</label>
          <div className="field">
            <input type="email" name="email" id="email" className="form-control" placeholder="your email" onChange={this.onChange} />
          </div>
        </div>
        <div className={wrapperClass} >
          <label htmlFor="password">Password</label>
          <div className="field">
            <input type="password" name="password" id="password" className="form-control" placeholder="your password" onChange={this.onChange} />
          </div>
        </div>
        <button className="btn btn-primary" onClick={this.signIn} type="submit">Sign In</button>
      </form>
    );
  }
}
//
// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(actions, dispatch)
//   };
// }

export default connect(null, actions) (Signin);
