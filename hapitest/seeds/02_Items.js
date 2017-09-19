exports.seed = function seed( knex, Promise ) {
  
      var tableName = 'items';
  
      var rows = [
  
          {
              name: 'Coding Club',
              itemid: '4c8d84f19e',
              location: 'East 111'
          },
  
          {
              name: 'Robotics Club',
              location: 'West 145',
              itemid: 'ddb8a1366d',
          },
  
      ];
  
      return knex( tableName )
          .del()
          .then( function() {
              return knex.insert( rows ).into( tableName );
          });
  
  };