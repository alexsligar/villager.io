exports.seed = function seed( knex, Promise ) {
    
    var tableName = 'item_tags';

    var rows = [

        {    
            tag_name: 'kid-friendly',
            item_id: 1,
        },

        {
            tag_name: 'Food',
            item_id: 2,
        },
        {
            tag_name: 'outdoors',
            item_id: 3,
        }

    ];

    return knex( tableName )
        .del()
        .then( function() {
            return knex.insert( rows ).into( tableName );
        });

};