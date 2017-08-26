import React, { Component } from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from 'images/fish.png';

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

class Login extends Component {
    constructor() {
        super();

        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);

        this.state = {
            email: '',
            password: '',
            errorMsg: ''
        }
    }

    onEmailChange(event) { this.setState({email: event.target.value}) }
    onPasswordChange(event) { this.setState({password: event.target.value}) }

    handleLoginClick(event) {
        event.preventDefault();

        fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        }).then(function(response) {
            if (response.status === 200) {
                this.props.history.push(`/dashboard`);
            } else if (response.status === 400) {
                //This should be handled by form validation?
            } else if (response.status === 401) {
                this.setState({ errorMsg: "Invalid email or password." });
            }
        }.bind(this))
    }

    render() {
        return (
            <ParentDiv>
                <MainDiv>
                        <div>
                            <div className="flex-center m-b-lg">
                                <img src={logo} className="logoImage" alt="logo" height="50" width="50" />
                            </div>
                            <LoginHeader>Log in to Draw Go</LoginHeader>
                            <div className="flex-center m-t-md m-b-md color-red">{this.state.errorMsg}</div>
                            <form className="loginForm" onSubmit={this.handleLoginClick}>
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
                                <br/>
                                <Button type="submit" className="button-login m-t-md">Log In</Button>
                            </form>
                        </div>
                </MainDiv>
                <FooterDiv>
                    <Link to='/register'>Create an Account</Link>
                </FooterDiv>
            </ParentDiv>
        );
    }
}

export default Login;
