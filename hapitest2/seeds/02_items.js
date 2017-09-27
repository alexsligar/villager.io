exports.seed = function seed( knex, Promise ) {
    
        var tableName = 'items';
    
        var rows = [
    
            {    
                name: 'Coding Club',
                location: 'East 111'
            },
    
            {
                name: 'Robotics Club',
                location: 'West 111'
            },
    
        ];
    
        return knex( tableName )
            .del()
            .then( function() {
                return knex.insert( rows ).into( tableName );
            });
    
    };