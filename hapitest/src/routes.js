import Knex from './knex';

///temp solution to creating id
function makeid() {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
  }     

const routes = [
    {
        path: '/lists',method:'GET',handler: (request,reply) => {
            const getOperation = Knex( 'lists')
            .join('items','items.itemid','=','lists.itemid')
            .join('users','users.userid','=','lists.userid')
            .select('items.name','items.location','listid')
            .orderBy('listid')
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

                reply( err );
            });

        }
    },
    {
        path: '/lists/{listid}',method:'GET',handler: (request,reply) => {
            var id = request.params.listid;
            
            const getOperation = Knex( 'lists')
            .join('items','items.itemid','=','lists.itemid')
            .join('users','users.userid','=','lists.userid')
            .where({'listid': id})
            .select('items.name','items.location','listid')
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

                reply( err );
            });

        }
    },
    {
        path: '/items',method: 'GET', handler: ( request, reply ) => {
            const getOperation = Knex( 'items' )
                      
            .where({})
            .select('name','location','itemid')
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
        path: '/users/{userid}',method:'GET',handler: (request,reply) => {
            var id = request.params.userid;
            
        
            const getOperation = Knex( 'lists')
            .join('items','items.itemid','=','lists.itemid')
            .join('users','users.userid','=','lists.userid')
            .where({'lists.userid': id})
            .select('items.name','items.location','listid')
            .orderBy('lists.listid')
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

                reply( err );
            });

        }
    },
    {
        path: '/additem', method: 'POST', handler: (request,reply) => {
            const data =JSON.parse(request.payload);
            const name=data.name;
            const location=data.location;
            const itemid=makeid();
            const insertOperation =Knex('items')
            .insert( {name,location,itemid} )
            .then( ( res ) => {               
                reply( {
                    data: itemid,
                    message: 'successfully created item'
                } );
            }).catch((err)=>{
                reply( err );
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
        const userid=makeid();
        const insertOperation =Knex('users')
        .insert( {name,username,email,password,userid} )
        .then( ( res ) => {                
            reply( {
                data: username,
                message: 'successfully created user'
            })            
        }).catch((err)=>{reply( err )})   
    }
},
{
    path: '/addlist', method: 'post', handler: (request,reply) => {
        
        const data =JSON.parse(request.payload);

        const itemid=data.itemid;
        const userid=data.userid;
        var listid;
        
        if(data.listid==null)
        {
            listid=makeid();
        }
        else
        {
            listid=data.listid;
        }
        const insertOperation =Knex('lists')
        .insert( {itemid,userid,listid} )
        .then( ( res ) => {                
            reply( {
                data: listid,
                message: 'successfully created list'
            })            
        }).catch((err)=>{reply( err )})   
    }
},
{
    path: '/delitem', method: 'delete', handler: (request,reply) => {
        const data =JSON.parse(request.payload);
        const itemid=data.itemid;
        
        const delOperation =Knex("items").where("itemid",itemid)
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
},    
{
    path: '/dellist', method: 'delete', handler: (request,reply) => {
        const data =JSON.parse(request.payload);
        const listid=data.listid;
        
        const delOperation =Knex("lists").where("lsitid",listid)
        .del()
        .then(function (count) {reply(count+' entries deleted')})
    }
}
];

export default routes;

