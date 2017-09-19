
exports.seed = function seed( knex, Promise ) {
    
        var tableName = 'lists';
    
        var rows = [
    
            
            {
                listid:'jah59dkn9f',
                userid:'f03ede7cb1',
                itemid:'4c8d84f19e'
            },
            {
                listid:'jah59dkn9f',
                userid:'f03ede7cb1',
                itemid:'ddb8a1366d'
            },
            
    
        ];
    
        return knex( tableName )
            // Empty the table (DELETE)
            .del()
            .then( function() {
                return knex.insert( rows ).into( tableName );
            });
    
    };
  