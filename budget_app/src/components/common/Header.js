import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Logo from '../../assets/logo.svg';
import TextField from '@material-ui/core/TextField';
import LogoutIcon from '@material-ui/icons/PowerSettingsNew';


const styles = theme => ({
  flex: {
    flex: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'transparent'
  },
});


class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: "",
    }
  }

  handleTextChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const { classes } = this.props;

    return (
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <img src={Logo} alt="Logo" style={{maxWidth:60, paddingRight: '10px'}}/>
          <Typography variant="title" color="inherit" className={classes.flex}>
            <TextField
              name="search"
              fullWidth
              placeholder="Search"
              onChange={this.handleTextChange}
              value={this.state.search}
              type="search"
              style={{paddingTop: 15}}
            />
          </Typography>
          <Button variant="fab" mini onClick={this.props.logout} disabled={this.props.loading} color="secondary"><LogoutIcon/></Button>
        </Toolbar>
      </AppBar>
    )
  }
}


export default withStyles(styles)(Header)
