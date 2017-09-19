
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
        usersTable.string( 'userid', 50 ).notNullable().unique();

    } )

    
    .createTable( 'items', function( itemTable ) {

        // Primary Key
        itemTable.increments();
        //itemTable.string( 'owner', 36 ).references( 'guid' ).inTable( 'users' );

        // Data 
        itemTable.string( 'name', 250 ).notNullable();
        itemTable.string( 'location', 250 ).notNullable();
        itemTable.string( 'itemid', 50 ).notNullable().unique();

    } )
    .createTable( 'lists', function(listTable){
        //Primary key
        listTable.increments();

        //Data
        listTable.string('listid',50).notNullable();
        listTable.string('userid',50).references('userid').inTable('users');
        listTable.string('itemid',50).references('itemid').inTable('items');

    });

};

exports.down = function(knex, Promise) {
  return knex
  .schema
      .dropTableIfExists( 'items' )
      .dropTableIfExists( 'users' )
      .dropTableIfExists( 'lists' );
};
