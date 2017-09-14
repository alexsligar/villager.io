import Knex from './knex';


const routes = [
    {
        path: '/items',
        method: 'GET',
        handler: ( request, reply ) => {

            const getOperation = Knex( 'items' ).where( {
            } ).select( 'owner','name', 'location','guid' ).then( ( results ) => {

                if( !results || results.length === 0 ) {

                    reply( {

                        error: true,
                        errMessage: 'non found',

                    } );

                }
                reply( {

                    dataCount: results.length,
                    data: results,

                } );

            } ).catch( ( err ) => {

                reply( 'server-side error' );
            } );
        }
    },
    {
        path: '/users',
        method: 'GET',
        handler: ( request, reply ) => {

            const getOperation = Knex( 'users' ).where( {
            } ).select( 'name', 'username','email','password','guid' ).then( ( results ) => {

                if( !results || results.length === 0 ) {

                    reply( {

                        error: true,
                        errMessage: 'non found',

                    } );

                }
                reply( {

                    dataCount: results.length,
                    data: results,

                } );

            } ).catch( ( err ) => {

                reply( 'server-side error' );
            } );
        }
    },
    {
        path: '/additem',
        method: 'POST',
        handler: (request,reply) => {
            const data =JSON.parse(request.payload);
            const name=data.name;
            const location=data.location;
            const owner=data.owner;
            const guid=data.guid;

            const insertOperation =Knex('items').insert({
                owner,name,location,guid
            } ).then( ( res ) => {
                
                reply( {

                    data: guid,
                    message: 'successfully created item'

                } );
                
            
        }).catch((err)=>{
            reply('server error');
        })   
        }
    },
    {
        path: '/adduser',
        method: 'POST',
        handler: (request,reply) => {
            const data =JSON.parse(request.payload);
            const name=data.name;
            const username=data.username;
            const email=data.email;
            const password=data.password;
            const guid=data.guid;

            const insertOperation =Knex('users').insert({
                name,username,email,password,guid
            } ).then( ( res ) => {
                
                reply( {
                    message: 'successfully created user'

                } );
                
            
        }).catch((err)=>{
            reply('server error');
        })   
        }
    },

    {
        path: '/delitem',
        method: 'delete',
        handler: (request,reply) => {
            const data =JSON.parse(request.payload);
            const guid=data.guid;
            var countdel=0;
            const insertOperation =Knex("items").where("guid",guid).del().then(function (count) {
                console.log(count);
                countdel=count;
              }).then( ( res ) => {
                
                reply( {
                    message: 'successfully deleted ' +countdel+' entry'
                } ); 
        })
                
        }
    },
    {
        path: '/deluser',
        method: 'delete',
        handler: (request,reply) => {
            const data =JSON.parse(request.payload);
            const username=data.username;
            var countdel=0;
            const insertOperation =Knex("users").where("username",username).del().then(function (count) {
                console.log(count);
                countdel=count;
              }).then( ( res ) => {
                if(countdel==0)
                {
                    reply( {
                        message: 'No user found'
                    } )
                }
                else{
                reply( {
                    message: 'successfully deleted a user'
                } )}; 
        })
                
        }
    }
    
];

export default routes;