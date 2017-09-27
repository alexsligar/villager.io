exports.seed = function seed( knex, Promise ) {
    
        var tableName = 'users';
    
        var rows = [
            
            {
                id: 'e129cc9e-460e-4e52-9573-92e3ff0007ef',
                name: 'Roberto Pierini',
                username: 'Robfrikaans',
                password: 'password',
                email: 'Rob@email.com'
            },
    
        ];
    
        return knex( tableName )
            // Empty the table (DELETE)
            .del()
            .then( function() {
                return knex.insert( rows ).into( tableName );
            });
    
    };
  