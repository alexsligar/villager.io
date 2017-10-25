exports.seed = function seed( knex, Promise ) {
    
        var tableName = 'list_items';
    
        var rows = [

            {
                id: '4db4aa8a-09b4-4202-9042-fa2d2adca612',
                item_id: 1,
                list_id: 'e129cc9e-460e-4e52-9573-92e3ff0007ef',
                order: '1'
            },
            {
                id: '1228bf48-a2f8-40b4-8983-526cf8b7c82b',
                item_id: 2,
                list_id: 'e129cc9e-460e-4e52-9573-92e3ff0007ef',
                order: '2'
            }
        ];
    
        return knex( tableName )
            .del()
            .then( function() {
                return knex.insert( rows ).into( tableName );
            });
    
    };