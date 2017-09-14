import Hapi from 'hapi';
import Knex from './knex';
import routes from './routes';

const server = new Hapi.Server();

server.connection( {
    port: 8080
} );

server.register( require( 'hapi-auth-jwt' ), ( err ) => {
   
    routes.forEach( ( route ) => {
        
                console.log( `attaching ${ route.path }` );
                server.route( route );
        
            } );

} );

server.start( err => {

    if( err ) {

        // Fancy error handling here
        console.error( 'Error was handled!' );
        console.error( err );

    }

    console.log( `Server started at ${ server.info.uri }` );

 } );

// server.route( {
    
//         path: '/items',
//         method: 'GET',
//         handler: ( request, reply ) => {   
                
//                     // In general, the Knex operation is like Knex('TABLE_NAME').where(...).chainable(...).then(...)
//                     const getOperation = Knex( 'items' ).where( {
                
//                     } ).select( 'name', 'location' ).then( ( results ) => {
                
//                         if( !results || results.length === 0 ) {
                
//                             reply( {
                
//                                 error: true,
//                                 errMessage: 'non found',
                
//                             } );
                
//                         }
                
//                         reply( {
                
//                             dataCount: results.length,
//                             data: results,
                
//                         } );
                
//                     } ).catch( ( err ) => {
                
//                         reply( 'server-side error' );
                
//                     } );
//         }
    
//     } );