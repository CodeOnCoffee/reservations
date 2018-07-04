/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Queries from './Queries'
import { Query } from 'react-apollo'
import moment from 'moment'

class Reservations extends React.Component {
  render () {
    const {classes} = this.props

    return <Query
      query={Queries.Reservations}
      pollInterval={5000}
    >
      {({loading, error, data, startPolling, stopPolling}) => {
        let Panels = !loading && !error && data.reservations ? data.reservations.map(r => {
          return <ExpansionPanel key={r.id}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
              <div className={classes.column}>
                <Typography className={classes.heading}>{r.hotelName}</Typography>
              </div>
              <div className={classes.column}>
                <Typography
                  className={classes.secondaryHeading}>{moment(r.arrivalDate).format('MMMM Do YYYY')}</Typography>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>

              <div className={classes.column}>
                <Typography>
                  Reservation Id: {r.id}
                </Typography>
              </div>
              <div className={classes.column}>
                <Typography>
                  Check In Date: {moment(r.arrivalDate).format('MMMM Do YYYY')}
                </Typography>
              </div>
              <div className={classes.column}>
                <Typography>
                  Check Out Date: {moment(r.departureDate).format('MMMM Do YYYY')}
                </Typography>
              </div>

            </ExpansionPanelDetails>
          </ExpansionPanel>
        }) : null

        return <div className={classes.centerPanel}>
          {Panels}
          {!loading && error && <Typography variant="display1" gutterBottom>
            {error.message}
          </Typography>
          }
        </div>
      }}
    </Query>
  }
}

Reservations.propTypes = {
  classes: PropTypes.object.isRequired
}

export default Reservations
