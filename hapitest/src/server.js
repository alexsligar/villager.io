import Hapi from 'hapi';
import routes from './routes';

const server = new Hapi.Server();
server.connection( {
    port: 8080
} );

server.register( require( 'hapi-auth-jwt2' ), ( err ) => {
    routes.forEach( ( route ) => {
        console.log( `attaching ${ route.path }` );
        server.route( route );
    } );
} );

server.start( err => {
    if( err ) {
        console.error( 'Error was handled!' );
        console.error( err );
    }
    console.log( `Server started at ${ server.info.uri }` );
 } );

