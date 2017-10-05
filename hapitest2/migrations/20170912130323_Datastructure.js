
exports.up = function(knex, Promise) {
    return knex
    .schema
    .createTable( 'users', function( usersTable ) {
        usersTable.uuid( 'id' ).defaultTo(knex.raw( 'uuid_generate_v4()' )).primary();
        usersTable.text( 'name' );
        usersTable.text( 'username' ).unique();
        usersTable.text( 'email' ).unique();
        usersTable.text( 'password');
    } )   
    .createTable( 'items', function( itemsTable ) {
        itemsTable.increments();
        itemsTable.text( 'name' );
        itemsTable.text( 'location' );
        itemsTable.uuid( 'owner' ).references('id').inTable('users').index();
    } )
    .createTable( 'lists', function(listsTable){
        listsTable.uuid( 'id' ).defaultTo(knex.raw( 'uuid_generate_v4()' )).primary();
        listsTable.text( 'name' );
        listsTable.uuid( 'owner' ).references( 'id' ).inTable( 'users' ).index();
    })
    .createTable('listitem',function(listitemTable){
        listitemTable.uuid( 'id' ).defaultTo(knex.raw( 'uuid_generate_v4()' )).primary();
        listitemTable.integer( 'itemid' ).references( 'id' ).inTable( 'items' ).index();
        listitemTable.uuid( 'listid' ).references( 'id' ).inTable( 'lists' ).index();
        listitemTable.text( 'order' );  
    })
    ;

};

exports.down = function(knex, Promise) {
  return knex
  .schema
      .dropTableIfExists( 'items' )
      .dropTableIfExists( 'users' )
      .dropTableIfExists( 'lists' )
      .dropTableIfExists( 'listitem' );
};
