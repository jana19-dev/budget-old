import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { login } from '../actions/auth';
import Logo from '../assets/logo.svg';
import Notification from '../components/common/Notification';
import Typography from '@material-ui/core/Typography';


const Wrapper = styled.div`
  max-width: 400px;
  max-height: 600px;
  background: transparent !important;
  margin: 50px auto;
  text-align: center;
`

const TextInput = styled(TextField)`
  margin: 10px 0 !important;
`

const LoginButton = styled(Button)`
  margin: 10px 0 !important;
  max-width: 70%;
`

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: ""
    }
  }

  componentDidMount = () => {
    if (this.props.token) this.props.history.push('/')
  }

  componentDidUpdate = () => {
    if (this.props.token) this.props.history.push('/')
  }

  handleTextChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = (event) => {
    event.preventDefault()
    const { email, password } = this.state
    this.props.login({email, password})
  }

  render() {  
    return (
      <Wrapper>
        <Notification />
        <form onSubmit={this.login} style={{padding: 10}}>
          <Typography variant='headline'>Budget</Typography>
          <img src={Logo} alt="Logo" style={{maxWidth:250}}/>
          <TextInput
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
            fullWidth
            autoFocus
            onChange={this.handleTextChange}
            value={this.state.email}
            required
          />
          <TextInput
            name="password"
            label="Password"
            type="password"
            autoComplete="password"
            fullWidth
            onChange={this.handleTextChange}
            value={this.state.password}
            required
          />
          <LoginButton type="submit" variant="contained" color="primary" fullWidth>
            Login
          </LoginButton>
        </form>
      </Wrapper>
    )
  }
}


const mapStateToProps = state => ({
  token: state.auth.token
})

const mapDispatchToProps = dispatch => ({
  login: credentials => dispatch(login(credentials))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)