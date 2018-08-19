import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    width: 240,
    backgroundColor: 'transparent',
    border: 'none'
  },
  toolbar: {...theme.mixins.toolbar, minHeight: '57px !important'},
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  secondary: {
    textAlign: 'right',
    fontSize: 13
  }
});

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true,
    }
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes } = this.props;

    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>
          <ListItem button onClick={this.handleClick} dense>
            <ListItemText primary="Chequing" secondary='4,521.56'/>
            {this.state.open ? <ExpandLess style={{color:"#fff"}} /> : <ExpandMore style={{color:"#fff"}}/>}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested} divider dense >
                <ListItemText primary="Starred" secondary='4,521.56' secondaryTypographyProps={{className: classes.secondary}}/>
              </ListItem>
              <ListItem button className={classes.nested} divider dense >
                <ListItemText primary="Starred" secondary='421.56' secondaryTypographyProps={{className: classes.secondary}}/>
              </ListItem>
              <ListItem button className={classes.nested} divider dense >
                <ListItemText primary="Starred" secondary='4,521.56' secondaryTypographyProps={{className: classes.secondary}}/>
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Drawer>
    )
  }
}




export default withStyles(styles)(Sidebar)