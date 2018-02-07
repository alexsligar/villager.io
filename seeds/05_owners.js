exports.seed = function seed( knex, Promise ) {
    
        var tableName = 'item_owners';
    
        var rows = [
    
            {    
                username: 'Robfrikaans',
                item_id: 1,
            },
    
            {
                username: 'Robfrikaans',
                item_id: 2,
            },
            {
                username: 'Robfrikaans',
                item_id: 3,
            }
    
        ];
    
        return knex( tableName )
            .del()
            .then( function() {
                return knex.insert( rows ).into( tableName );
            });
    
    };