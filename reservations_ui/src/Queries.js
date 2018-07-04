import gql from 'graphql-tag'

const Queries = {
  Reservations: gql`
    query{
      reservations{
        id
        name
        hotelName
        arrivalDate
        departureDate
      }
    }
  `,
  CreateReservation: gql`
    mutation addReservation($name:String!, $hotelName: String!, $arrivalDate: String!, $departureDate: String!){
      addReservation(input : {
        name: $name, 
        hotelName: $hotelName, 
        arrivalDate: $arrivalDate, 
        departureDate: $departureDate
      }){
        id
        name
        hotelName
        arrivalDate
        departureDate
      }
    }
  `
}
export default Queries
