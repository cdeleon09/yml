import React, { Component } from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

    onFirstNameChange(event, val) { this.setState({firstName: val}) }
    onLastNameChange(event, val) { this.setState({lastName: val}) }
    onEmailChange(event, val) { this.setState({email: val}) }
    onPasswordChange(event, val) { this.setState({password: val}) }

    handleSignUpClick(event) {

    }

    render() {
        return (
            <ParentDiv>
                <MainDiv>
                        <div>
                            <LoginHeader>Create an account</LoginHeader>
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
                            <br/>
                            <StyledButton onClick={this.handleSignUpClick}>
                                Sign Up
                            </StyledButton>
                        </div>
                </MainDiv>
                <FooterDiv>
                    <Link to='/'>Already have an account? Login</Link>
                </FooterDiv>
            </ParentDiv>
        );
    }
}

export default Register;