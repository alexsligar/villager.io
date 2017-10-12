exports.seed = function seed( knex, Promise ) {
    
        var tableName = 'listitem';
    
        var rows = [
    
            {
                id: 'ab7af032-0b9f-4aab-9c06-7c4937ee8670',
                itemid: 1,
                listid: '1a9d09e7-a27e-414d-9417-01ea01669a59',
                order: 1
            },
    
            {
                id: '9522c242-f7db-4ae7-813b-eb7234d28a90',
                itemid: 2,
                listid: '1a9d09e7-a27e-414d-9417-01ea01669a59',
                order: 2
            }
            
    
        ];
    
        return knex( tableName )
            .del()
            .then( function() {
                return knex.insert( rows ).into( tableName );
            });
    
    };