import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Header from './Header';
import Sidebar from './Sidebar';
import { logout } from '../../actions/auth';
import Notification from './Notification';


const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 2,
    minWidth: 0
  },
  toolbar: theme.mixins.toolbar,
});

export default function (ComposedComponent) {
  class PageWrap extends Component {
    componentWillMount() {
      if (!this.props.token) this.props.history.push('/login')
    }

    componentDidUpdate = () => {
      if (!this.props.token) this.props.history.push('/login')
    }

    render() {
      const { classes } = this.props;

      return (
        <div className={classes.root}>
        <Header logout={this.props.logout} loading={this.props.loading}/>
        <Sidebar activePage={this.props.match.path} gotoLink={(link)=>this.props.history.push(link)} loading={this.props.loading}/>
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <ComposedComponent {...this.props} />
        </main>
          <Notification />
        </div>
      )
    }
  }

  const mapStateToProps = state => ({
    token: state.auth.token,
    loading: state.general.loading
  })

  const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
  })

  return connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PageWrap))
}