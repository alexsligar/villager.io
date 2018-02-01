exports.seed = function seed( knex, Promise ) {
    
    var tableName = 'tags';

    var rows = [

        {    
            name: 'kid-friendly',
        },
        {
            name: 'Food',
        },
        {
            name: 'outdoors',
        }

    ];

    return knex( tableName )
        .del()
        .then( function() {
            return knex.insert( rows ).into( tableName );
        });

};