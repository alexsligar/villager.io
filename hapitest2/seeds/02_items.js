exports.seed = function seed( knex, Promise ) {
    
        var tableName = 'items';
    
        var rows = [
    
            {    
                name: 'WSUTC',
                location: '2710 Crimson Way, Richland, WA 99354',
                owner: 'e129cc9e-460e-4e52-9573-92e3ff0007ef',
                type: 'place'
            },
    
            {
                name: 'Robotics Club',
                location: 'West 111',
                owner: 'e129cc9e-460e-4e52-9573-92e3ff0007ef',
                type: 'group',
                linked_place: '1',
            },
            {
                name: 'Robotics Club showcase',
                location: 'West 111',
                owner: 'e129cc9e-460e-4e52-9573-92e3ff0007ef',
                type: 'activity',
                linked_place: '1',
                linked_group: '2'
            }
    
        ];
    
        return knex( tableName )
            .del()
            .then( function() {
                return knex.insert( rows ).into( tableName );
            });
    
    };