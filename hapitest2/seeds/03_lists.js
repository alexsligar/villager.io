exports.seed = function seed( knex, Promise ) {
    
        var tableName = 'lists';
    
        var rows = [
    
            {
                name: 'Nerd clubs',
                userid: 'f03ede7cb1'
            },
    
            {
                name: 'Nerd clubs',
                userid: 'f03ede7cb1',
            },
    
        ];
    
        return knex( tableName )
            .del()
            .then( function() {
                return knex.insert( rows ).into( tableName );
            });
    
    };