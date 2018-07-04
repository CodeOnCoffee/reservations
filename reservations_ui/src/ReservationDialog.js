/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'

import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl/FormControl'
import Select from '@material-ui/core/Select/Select'
import { Mutation } from 'react-apollo'
import Cookies from 'js-cookie'
import Queries from './Queries'

const hotels = ['The Ritz', 'Bates Motel', 'The Polynesian']

class ReservationDialog extends React.Component {
  state = {
    valid: false,
    hotel: hotels[0],
    checkInDate: new Date().toISOString(),
    checkOutDate: new Date().toISOString()
  }

  save = () => {
    this.props.handleSave({
      hotel: this.state.hotel,
      checkInDate: this.state.checkInDate,
      checkOutDate: this.state.checkOutDate
    })
  }
  updateForm = name => event => {
    let newState = {
      ...this.state,
      [name]: event.target.value,

    }
    this.setState({
      ...newState,
      valid: newState.hotel && new Date(newState.checkInDate).getTime() < new Date(newState.checkOutDate).getTime()
    })

  }

  render () {

    const {classes} = this.props

    return <Mutation mutation={Queries.CreateReservation}
                     update={(cache, {data: {addReservation}}) => {
                       const {reservations} = cache.readQuery({query: Queries.Reservations})
                       cache.writeQuery({
                         query: Queries.Reservations,
                         data: {reservations: reservations.concat([addReservation])}
                       })
                     }}
    >
      {(addReservation, {data, loading, called, error}) => (<Dialog
        open={this.props.open}
        maxWidth={'md'}
        onClose={this.props.handleReservationClose}
        aria-labelledby="form-dialog-title"

      >
        <DialogTitle id="form-dialog-title">New Reservation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please keep in mind that we're going to take your money and you'll never see it again
          </DialogContentText>

          <FormControl className={classes.formControl}>
            <Select
              native
              value={this.state.hotel}
              onChange={this.updateForm('hotel')}
            >
              {hotels.map((h) => <option key={h} value={h} selected={this.state.hotel === h}>{h}</option>)}

            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <TextField
              required
              label="Check In Date"
              type="date"
              value={this.state.checkInDate}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.updateForm('checkInDate')}
            />
          </FormControl>

          <FormControl className={classes.formControl}>
            <TextField
              required
              label="Check Out Date"
              type="date"
              value={this.state.checkOutDate}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.updateForm('checkOutDate')}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => {
            let username = Cookies.getJSON('login').username
            addReservation({
              variables: {
                hotelName: this.state.hotel,
                name: username,
                departureDate: this.state.checkOutDate,
                arrivalDate: this.state.checkInDate,
              }
            })
            this.props.handleSave()
          }}
                  color="primary" disabled={!this.state.valid}>
            Save
          </Button>
        </DialogActions>
      </Dialog>)}
    </Mutation>

  }
}

ReservationDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  open: PropTypes.bool
}

export default ReservationDialog
