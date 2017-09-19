
exports.seed = function seed( knex, Promise ) {
  
      var tableName = 'users';
  
      var rows = [
          
          {
              name: 'Roberto Pierini',
              username: 'Robfrikaans',
              password: 'password',
              email: 'Rob@email.com',
              userid: 'f03ede7cb1'
          },
  
      ];
  
      return knex( tableName )
          // Empty the table (DELETE)
          .del()
          .then( function() {
              return knex.insert( rows ).into( tableName );
          });
  
  };
