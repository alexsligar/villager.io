import Knex from '../knexfile';

const routes = [
    {
        path: '/items',method: 'GET', handler: ( request, reply ) => {
            const getOperation = Knex( 'items' )
            .join('users','users.guid','=','items.owner')            
            .where({})
            .select('items.name','location','users.username')
            .then( ( results ) => {
                if( !results || results.length === 0 ) {
                    reply( {
                        error: true,
                        errMessage: 'non found',
                    } );
                }
                else{
                    reply({
                        dataCount: results.length,
                        data: results,
                    });
                }
            })
            .catch(( err ) => {
                reply( 'Error:'+err );
            });
        }
    },
    {
        path: '/users',method: 'GET',handler: ( request, reply ) => {
            const getOperation = Knex( 'users' )
            .where({})
            .select( )
            .then(( results ) => {
                if( !results || results.length === 0 ) {
                    reply( {
                        error: true,
                        errMessage: 'non found',
                    } );
                }
                reply({
                    dataCount: results.length,
                    data: results,
                });
            }).catch( ( err ) => {
                reply( 'Error:'+err );
            } );
        }
    },
    {
        path: '/additem', method: 'POST', handler: (request,reply) => {
            const data =JSON.parse(request.payload);
            const name=data.name;
            const location=data.location;
            const owner=data.owner;
            const guid=data.guid;
            const insertOperation =Knex('items')
            .insert( {owner,name,location,guid} )
            .then( ( res ) => {               
                reply( {
                    data: guid,
                    message: 'successfully created item'
                } );
            }).catch((err)=>{
                reply( 'Error:'+err );
            })   
        }
    },
    {
        path: '/adduser', method: 'POST', handler: (request,reply) => {
            const data =JSON.parse(request.payload);
            const name=data.name;
            const username=data.username;
            const email=data.email;
            const password=data.password;
            const guid=data.guid;
            const insertOperation =Knex('users')
            .insert( {name,username,email,password,guid} )
            .then( ( res ) => {                
                reply( {
                    data: username,
                    message: 'successfully created user'
                })            
            }).catch((err)=>{reply( 'Error:'+err )})   
        }
    },

    {
        path: '/delitem', method: 'delete', handler: (request,reply) => {
            const data =JSON.parse(request.payload);
            const guid=data.guid;
            
            const delOperation =Knex("items").where("guid",guid)
            .del()
            .then(function (count) {reply(count+' entries deleted')})
        }
    },
    {
        path: '/deluser', method: 'delete', handler: (request,reply) => {
            const data =JSON.parse(request.payload);
            const username=data.username;
            const delOperation =Knex("users")
            .where("username",username)
            .del()
            .then(function (count) {reply(count+' entries deleted')}) 
        }
    }  
];

export default routes;