import React, { Component } from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../images/fish.png';

const StyledButton = styled(Button)`
    margin-top: 15px;
    width: 100%;
`;

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

const LoginImage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`;

class Login extends Component {
    constructor(){
        super();

        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);

        this.state = {
            email: '',
            password: '',
        }
    }

    onEmailChange(event) { this.setState({email: event.target.value}) }
    onPasswordChange(event) { this.setState({password: event.target.value}) }

    handleLoginClick() {
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
        }).then(function() {
            this.props.history.push(`/`);
        }.bind(this))
    }

    render() {
        return (
            <ParentDiv>
                <MainDiv>
                        <div>
                            <LoginImage>
                                <img src={logo} className="logoImage" alt="logo" height="50" width="50" />
                            </LoginImage>
                            <LoginHeader>Log in to Draw Go</LoginHeader>

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
                            <StyledButton onClick={this.handleLoginClick}>
                                Log In
                            </StyledButton>
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
