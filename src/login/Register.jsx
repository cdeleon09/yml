import React, { Component } from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ParentDiv = styled.div`
    font-family: Roboto;
    font-weight: 300;
`;

const MainDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
`;

const FooterDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: top;
    height: 10vh;
    font-size: 14px;
`;

const LoginHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
`;

class Register extends Component {
    constructor(){
        super();

        this.onFirstNameChange = this.onFirstNameChange.bind(this);
        this.onLastNameChange = this.onLastNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.handleSignUpClick = this.handleSignUpClick.bind(this);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }
    }

    onFirstNameChange(event) { this.setState({firstName: event.target.value}); }
    onLastNameChange(event) { this.setState({lastName: event.target.value}) }
    onEmailChange(event) { this.setState({email: event.target.value}) }
    onPasswordChange(event) { this.setState({password: event.target.value}) }

    handleSignUpClick() {
        fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: this.state.firstName, 
                lastName: this.state.lastName, 
                email: this.state.email, 
                password: this.state.password
            })
        }).then(function() {
            this.props.history.push(`/login`);
        }.bind(this))
    }

    render() {
        return (
            <ParentDiv>
                <MainDiv>
                    <div>
                        <LoginHeader>Create an account</LoginHeader>
                        <form className="signUpForm" onSubmit={this.handleLoginClick}>
                            <TextField
                                label="First Name"
                                margin="normal"
                                style={{width: 330}}
                                onChange={this.onFirstNameChange}
                            />
                            <br />
                            <TextField
                                label="Last Name"
                                margin="normal"
                                style={{width: 330}}
                                onChange={this.onLastNameChange}
                            />
                            <br />
                            <TextField
                                label="Email Address"
                                margin="normal"
                                style={{width: 330}}
                                onChange={this.onEmailChange}
                            />
                            <br/>
                            <TextField
                                type="password"
                                label="Password"
                                margin="normal"
                                style={{width: 330}}
                                onChange={this.onPasswordChange}
                            />
                        </form>
                        <Button type="submit" className="button-login m-t-md">Sign Up</Button>
                    </div>
                </MainDiv>
                <FooterDiv>
                    <Link to='/login'>Already have an account? Login</Link>
                </FooterDiv>
            </ParentDiv>
        );
    }
}

export default Register;