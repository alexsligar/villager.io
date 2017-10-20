

exports.up = function(knex, Promise) {
    return knex
    .schema
    .createTable( 'users', function( usersTable ) {
        usersTable.uuid( 'id' ).defaultTo(knex.raw( 'uuid_generate_v4()' )).primary();
        usersTable.text( 'name' );
        usersTable.text( 'username' ).unique().notNullable();
        usersTable.text( 'email' ).unique();
        usersTable.text( 'password' ).notNullable();
        usersTable.text( 'bio' );
        usersTable.text( 'utype' ).notNullable().defaultTo('user');
        
    } ).raw("ALTER TABLE users ADD CONSTRAINT CHK_utype CHECK (utype='user' OR utype='mod' OR utype='admin')") 
    .createTable( 'items', function( itemsTable ) {
        itemsTable.increments();
        itemsTable.text( 'name' ).notNullable();
        itemsTable.text( 'location' );
        itemsTable.uuid( 'owner' ).references('id').inTable('users').index().notNullable();
        itemsTable.text( 'type' ).notNullable();
        itemsTable.integer( 'linkedgroup' ).references('id').inTable('items').index();
        itemsTable.integer( 'linkedplace' ).references('id').inTable('items').index();
    } )
    .createTable( 'lists', function(listsTable){
        listsTable.uuid( 'id' ).defaultTo(knex.raw( 'uuid_generate_v4()' )).primary();
        listsTable.text( 'name' ).notNullable();
        listsTable.uuid( 'owner' ).references( 'id' ).inTable( 'users' ).index();
        listsTable.text( 'description' );
    })
    .createTable('listitems',function(listitemTable){
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
