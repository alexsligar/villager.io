exports.seed = function seed( knex, Promise ) {
    
        var tableName = 'listitems';
    
        var rows = [
    
            {
                id: '9522c242-f7db-4ae7-813b-eb7234d28a90',
                itemid: 2,
                listid: '1a9d09e7-a27e-414d-9417-01ea01669a59',
                order: 1
            }
            
    
        ];
    
        return knex( tableName )
            .del()
            .then( function() {
                return knex.insert( rows ).into( tableName );
            });
    
    };