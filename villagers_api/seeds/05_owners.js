exports.seed = function seed( knex, Promise ) {
    
        var tableName = 'item_owners';
    
        var rows = [
    
            {    
                user_id: 'e129cc9e-460e-4e52-9573-92e3ff0007ef',
                item_id: 2,
            },
    
            {
                user_id: 'e129cc9e-460e-4e52-9573-92e3ff0007ef',
                item_id: 2,
            },
            {
                user_id: 'e129cc9e-460e-4e52-9573-92e3ff0007ef',
                item_id: 2,
            }
    
        ];
    
        return knex( tableName )
            .del()
            .then( function() {
                return knex.insert( rows ).into( tableName );
            });
    
    };