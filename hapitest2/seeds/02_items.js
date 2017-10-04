exports.seed = function seed( knex, Promise ) {
    
        var tableName = 'items';
    
        var rows = [
    
            {    
                name: 'Coding Club',
                location: 'East 111',
                owner: 'e129cc9e-460e-4e52-9573-92e3ff0007ef'
            },
    
            {
                name: 'Robotics Club',
                location: 'West 111',
                owner: 'e129cc9e-460e-4e52-9573-92e3ff0007ef'
            },
    
        ];
    
        return knex( tableName )
            .del()
            .then( function() {
                return knex.insert( rows ).into( tableName );
            });
    
    };