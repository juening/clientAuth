import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = { user: {}, errors: {} };
        this.onChange = this.onChange.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    onChange(event) {
        const field = event.target.id;
        let user = this.state.user;
        user[field] = event.target.value;
        this.setState({ user:user });
    }

    formValid(){
        let formIsValid = true;
        let error = {};
        if(!this.state.user.password || this.state.user.password.length < 6 ) {
            formIsValid = false;
            error.password = "Password must be at least 6 characters.";
        }
        if(this.state.user.password !== this.state.user.passwordConfirm ){
            formIsValid = false;
            error.password = "Passwords does not match!";
        }
        this.setState({errors: error });
        return formIsValid;
    }

    renderAlert() {
        if(this.props.errorMessage ) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops! </strong>{this.props.errorMessage  }
                </div>
            );
        }
        if( Object.keys(this.state.errors).length !==0 ) {
            let errorsArray = [];
            Object.keys(this.state.errors).forEach(key => {
                errorsArray.push(this.state.errors[key]);
            });
            return (
                <div className="alert alert-danger">
                    <strong>Oops! </strong>{errorsArray}
                </div>
            );
        }
    }

    signUp(event){
        event.preventDefault();
        // if(!this.formValid()){
        //     return;
        // }
        this.props.signUpUser(this.state.user);
    }

    render() {
        let wrapperClass="form-group";
        return (
            <div>
               <form onSubmit={this.signUp}>
                   <h2>Sign Up Form</h2>
                   <fieldset className={wrapperClass}>
                        <label htmlFor="firstName">First Name</label>                        
                        <input type="text" name="firstname" id="firstName" className="form-control" onChange={this.onChange}/>                        
                    </fieldset>

                    <fieldset className={wrapperClass}>
                        <label htmlFor="lastName">Last Name</label>                        
                        <input type="text" name="lastName" id="lastName" className="form-control" onChange={this.onChange}/>   
                    </fieldset>

                    <fieldset className={wrapperClass}>
                        <label htmlFor="email">Email</label>                        
                        <input type="email" name="email" id="email" className="form-control" onChange={this.onChange}/>                        
                    </fieldset>

                    <fieldset className={wrapperClass}>
                        <label htmlFor="password">Password</label>                        
                        <input type="password" name="password" id="password" className="form-control" onChange={this.onChange}/>                        
                    </fieldset>

                    <fieldset className={wrapperClass}>
                        <label htmlFor="passwordConfirm">Confirm Password</label>                        
                        <input type="password" name="passwordConfirm" id="passwordConfirm" className="form-control" onChange={this.onChange}/>                        
                    </fieldset>

                    <button onClick={this.signUp} type="submit" className="btn btn-primary">Submit</button>
                    { this.renderAlert() }
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions) (SignUp);