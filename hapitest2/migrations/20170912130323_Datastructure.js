

exports.up = function(knex, Promise) {
    return knex
    .schema
    .createTable( 'users', function( usersTable ) {
        usersTable.uuid( 'id' ).defaultTo(knex.raw( 'uuid_generate_v4()' )).primary();
        usersTable.text( 'name' );
        usersTable.text( 'username' ).unique().notNullable();
        usersTable.text( 'email' ).unique().notNullable();
        usersTable.text( 'password' ).notNullable();
        usersTable.text( 'bio' );
        usersTable.text( 'role' ).notNullable().defaultTo('user');
        usersTable.timestamp('logout').notNullable().defaultTo(knex.raw('now()'));
        usersTable.timestamps();
        
    } ).raw("ALTER TABLE users ADD CONSTRAINT CHK_role CHECK (role='user' OR role='mod' OR role='admin')") 
    .createTable( 'items', function( itemsTable ) {
        itemsTable.increments();
        itemsTable.text( 'name' ).notNullable();
        itemsTable.text( 'location' );
        itemsTable.text( 'type' ).notNullable();
        itemsTable.integer( 'linked_group' ).references('id').inTable('items').index();
        itemsTable.integer( 'linked_place' ).references('id').inTable('items').index();
    } )
    .createTable( 'lists', function(listsTable){
        listsTable.uuid( 'id' ).defaultTo(knex.raw( 'uuid_generate_v4()' )).primary();
        listsTable.text( 'name' ).notNullable();
        listsTable.uuid( 'owner' ).references( 'id' ).inTable( 'users' ).index();
        listsTable.text( 'description' );
    })
    .createTable('list_items',function(listitemTable){
        listitemTable.uuid( 'id' ).defaultTo(knex.raw( 'uuid_generate_v4()' )).primary();
        listitemTable.integer( 'item_id' ).references( 'id' ).inTable( 'items' ).index();
        listitemTable.uuid( 'list_id' ).references( 'id' ).inTable( 'lists' ).index();
        listitemTable.text( 'order' );  
    })
    .createTable('owners',function(ownerTable){
        ownerTable.uuid('id').defaultTo(knex.raw( 'uuid_generate_v4()' )).primary();
        ownerTable.uuid('user_id').references('id').inTable('users').index();
        ownerTable.integer('item_id').references('id').inTable('items').index();
    });


};

exports.down = function(knex, Promise) {
  return knex
  .schema
      .dropTableIfExists( 'items' )
      .dropTableIfExists( 'users' )
      .dropTableIfExists( 'lists' )
      .dropTableIfExists( 'list_items' )
      .dropTableIfExists( 'owners' );
};
