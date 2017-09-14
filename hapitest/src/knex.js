export default require( 'knex' )( {
    
        client: 'pg',
        connection: {
        url: '192.168.33.10',
        database: 'testdb',
        user:'postgres',
        password:'p'
        }
    
    } );