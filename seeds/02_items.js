exports.seed = function seed( knex, Promise ) {
    
        var tableName = 'items';
    
        var rows = [
    
            {    
                name: 'WSUTC',
                location: '2710 Crimson Way, Richland, WA 99354',
                type: 'place'
            },
    
            {
                name: 'Robotics Club',
                location: 'West 111',
                type: 'group',
                linked_place: 1,
            },
            {
                name: 'Robotics Club showcase',
                location: 'West 111',
                type: 'activity',
                linked_place: 1,
                linked_group: 2
            }
    
        ];
    
        return knex( tableName )
            .del()
            .then( function() {
                return knex.insert( rows ).into( tableName );
            });
    
    };