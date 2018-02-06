

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
    }) 
    .createTable( 'items', function( itemsTable ) {
        itemsTable.increments();
        itemsTable.text( 'name' ).notNullable();
        itemsTable.text( 'location' );
        itemsTable.text( 'type' ).notNullable();
        itemsTable.date( 'start_date' );
        itemsTable.date( 'end_date' );
        itemsTable.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
        itemsTable.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
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
    .createTable('item_owners',function(ownerTable){
        ownerTable.uuid( 'id' ).defaultTo(knex.raw( 'uuid_generate_v4()' )).primary();
        ownerTable.uuid( 'user_id' ).references( 'id' ).inTable( 'users' ).index();
        ownerTable.integer( 'item_id' ).references( 'id' ).inTable( 'items' ).index();
    })
    .createTable('tags',function(tagsTable){
        tagsTable.text( 'name' ).primary();
    })
    .createTable('item_tags',function(itemtagsTable){
        itemtagsTable.uuid( 'id' ).defaultTo(knex.raw( 'uuid_generate_v4()' )).primary();
        itemtagsTable.integer( 'item_id' ).references( 'id' ).inTable( 'items' ).index();
        itemtagsTable.text( 'tag_name' ).references( 'name' ).inTable( 'tags' ).index();
    });


};

exports.down = function(knex, Promise) {
  return knex
  .schema
      .dropTableIfExists( 'items' )
      .dropTableIfExists( 'users' )
      .dropTableIfExists( 'lists' )
      .dropTableIfExists( 'list_items' )
      .dropTableIfExists( 'item_owners' )
      .dropTableIfExists( 'tags' )
      .dropTableIfExists( 'item_tags' );
      
};
