
exports.up = function(knex, Promise) {
    return knex
    .schema
    .createTable( 'users', function( usersTable ) {

        // Primary Key
        usersTable.increments();

        // Data
        usersTable.string( 'name', 50 ).notNullable();
        usersTable.string( 'username', 50 ).notNullable().unique();
        usersTable.string( 'email', 250 ).notNullable().unique();
        usersTable.string( 'password', 128 ).notNullable();
        usersTable.string( 'guid', 50 ).notNullable().unique();

    } )

    .createTable( 'items', function( itemTable ) {

        // Primary Key
        itemTable.increments();
        itemTable.string( 'owner', 36 ).references( 'guid' ).inTable( 'users' );

        // Data 
        itemTable.string( 'name', 250 ).notNullable();
        itemTable.string( 'location', 250 ).notNullable();
        itemTable.string( 'guid', 36 ).notNullable().unique();

    } );

};

exports.down = function(knex, Promise) {
  return knex
  .schema
      .dropTableIfExists( 'items' )
      .dropTableIfExists( 'users' );

};
