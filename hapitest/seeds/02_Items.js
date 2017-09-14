exports.seed = function seed( knex, Promise ) {
  
      var tableName = 'items';
  
      var rows = [
  
          {
              owner: 'f03ede7c-b121-4112-bcc7-130a3e87988c',
              name: 'Coding Club',
              guid: '4c8d84f1-9e41-4e78-a254-0a5680cd19d5',
              location: 'East 111'
          },
  
          {
              owner: 'f03ede7c-b121-4112-bcc7-130a3e87988c',
              name: 'Robotics Club',
              location: 'West 145',
              guid: 'ddb8a136-6df4-4cf3-98c6-d29b9da4fbc6',
          },
  
      ];
  
      return knex( tableName )
          .del()
          .then( function() {
              return knex.insert( rows ).into( tableName );
          });
  
  };