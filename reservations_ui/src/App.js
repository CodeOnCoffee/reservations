/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'

import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Cookies from 'js-cookie'
import LoginDialog from './LoginDialog'
import ReservationDialog from './ReservationDialog'
import Reservations from './Reservations'

const styles = theme => ({

  root: {
    flexGrow: 1,
    flexWrap: 'wrap',
    height: '100%'
  },
  formControl: {

    margin: theme.spacing.unit,
    minWidth: 180,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },

  flex: {
    flex: 1,
  },
  centerPanel: {
    overflow: 'auto',
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },

  column: {
    flexBasis: '33.33%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  newbutton: {
    width: '100%'
  },
  body: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    alignContent: 'stretch',
    flexDirection: 'column',
    height: '100%'
  },
  loginBtn: {
    margin: 'auto'
  },

  'html, body, #__next': {
    height: '100%'
  }
})

class Index extends React.Component {
  state = {
    showNewReservation: false,
  }

  handleClickOpen = () => {
    this.setState({showNewReservation: true})
  }

  handleClose = () => {
    this.setState({showNewReservation: false})
  }

  handleHotelSelection = () => {

  }

  showLogin = () => {
    this.setState({login: true})
  }

  handleLogin = (username) => {
    Cookies.set('login', {username})
    this.setState({login: false})
  }

  handleLogout = () => {
    Cookies.remove('login')
    this.setState({login: true})
  }

  handleSave = () => {
    this.setState({showNewReservation: false})
  }

  loggedInContent () {

    const {classes} = this.props

    return <>

      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon/>
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            My Hilton Reservations
          </Typography>
          <Button color="inherit" onClick={this.handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Reservations reservations={[]} classes={classes}/>
      <div>
        <Button variant="contained" className={classes.newbutton} onClick={this.handleClickOpen} color={'primary'}>
          Create New Reservation
        </Button>
      </div>

      <ReservationDialog open={this.state.showNewReservation} handleSave={this.handleSave}
                         onClose={() => this.setState({showNewReservation: false})} classes={classes}/>
    </>
  }

  render () {
    const {classes} = this.props

    let login = Cookies.get('login')
    let Content = (login) ? this.loggedInContent() : <LoginDialog handleLogin={this.handleLogin} classes={classes}/>

    return (
      <div className={classes.root}>
        <div className={classes.body}>
          {Content}
        </div>
      </div>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Index)
