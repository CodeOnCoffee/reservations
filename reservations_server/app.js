const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const UUID = require('uuid/v4')
const cors = require('cors')

const app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const reservations = [{
  id: UUID(),
  name: 'Chester Copperpot',
  hotelName: "Terra Nap Inn",
  arrivalDate: "2018-08-01T13:00:00Z",
  departureDate: "2018-08-03T20:00:00Z"
}, {
  id: UUID(),
  name: 'Mr. Smith',
  hotelName: "Rencontre D'Amour",
  arrivalDate: "2018-08-02T13:00:00Z",
  departureDate: "2018-08-02T20:00:00Z"
}];

const typeDefs = `
  type Query { 
  	reservations: [Reservation] 
  	reservation(id: ID!): Reservation
  }

  type Reservation { 
  	id : ID
  	name : String!
    hotelName : String!
    arrivalDate : String!
    departureDate : String!
	}
  input ReservationInput {
  	name : String!
    hotelName : String!
    arrivalDate : String!
    departureDate : String!
  }
	type Mutation {
	  addReservation(input: ReservationInput): Reservation
	}
`;

// The resolvers
const resolvers = {
  Query: {
    reservations: () => reservations,
    reservation: id => reservations.find(r => r.id === id)
  },
  Mutation: {
    addReservation: (root, data) => {
      let reservation = data.input
    	if(reservations.find((r) => r.id === reservation.id)){
	    	throw new Error("Reservation already exists. Call Update instead")
    	}
		  let newRes = Object.assign({id: UUID()}, reservation)

	    reservations.push(newRes)
	    console.log(newRes)
	    return newRes
    }
  }

};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))

// GraphiQL
app.use('/', graphiqlExpress({ endpointURL: '/graphql' }));

// 404s
app.use(function (req, res, next) {
  next(createError(404));
});

// errors
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  console.log(err)
});
module.exports = app;


