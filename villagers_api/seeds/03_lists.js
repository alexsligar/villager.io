exports.seed = function seed( knex, Promise ) {
    
        var tableName = 'lists';
    
        var rows = [
    
            {
                id: '1a9d09e7-a27e-414d-9417-01ea01669a59',
                name: 'Nerd clubs',
                owner: 'e129cc9e-460e-4e52-9573-92e3ff0007ef',
                description: 'I am very creative'
            },
            {
                id: 'e129cc9e-460e-4e52-9573-92e3ff0007ef',
                name: 'starred',
                owner: 'e129cc9e-460e-4e52-9573-92e3ff0007ef',
                
            }
    
            
    
        ];
    
        return knex( tableName )
            .del()
            .then( function() {
                return knex.insert( rows ).into( tableName );
            });
    
    };