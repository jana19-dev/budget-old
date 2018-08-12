import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import wrapperPage from './components/common/Wrapper';
import FourOhFour from './components/common/FourOhFour';
import Login from './containers/Login';
import Home from './containers/Home';


class App extends Component {


  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={wrapperPage(Home)} />
          <Route exact path="/login" component={Login} />
          <Route component={FourOhFour} />
        </Switch>
      </Router>

    )
  }
}

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#ff0000',
    },
  },
});

function withRoot(Component) {
  function WithRoot(props) {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }
  return WithRoot;
}




export default withRoot(App);