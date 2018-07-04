# Reservation Example

This projects is broken down into two NodeJS applications. 

* **reservations_server** serves as a GraphQL server cased on Express.JS. 

* **reservations_ui** is a Next.JS webserver hosting a mobile client.

## Building

    cd reservations_server && npm install && npm build
    cd reservations_ui && npm install && npm run build
    
## Running

*Back-end:*

    cd reservations_server
    npm start
    
*Front-end:*

    cd reservations_ui
    npm start
        
## Entrypoints
The back-end server is available at http://localhost:3000 where it hosts a GraphiQL interface in 
addition to the main /graphql service 

The front-end interface is available at http://localhost:4000