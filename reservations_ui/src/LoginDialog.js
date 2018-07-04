/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'

import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl/FormControl'

class LoginDialog extends React.Component {
  state = {
    open: false,
  }

  render () {
    const {classes, handleLogin} = this.props

    return <>
      <Dialog
        open={true}
        maxWidth={'md'}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>

          <FormControl className={classes.formControl}>

            <TextField
              autoFocus={true}
              id="username"
              label="User Name"
              type="text"
              defaultValue=""
              className={classes.textField}
              onChange={(e) => this.setState({username: e.target.value})}
            />
          </FormControl>

        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleLogin(this.state.username)} color="primary"
                  disabled={!this.state.username || this.state.username.length === 0}>
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </>
  }
}

LoginDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  handleLogin: PropTypes.func.isRequired
}

export default LoginDialog