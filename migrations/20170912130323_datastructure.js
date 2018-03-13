'use strict';

exports.up = function (knex, Promise) {

    return (
        knex.schema
            .createTable('users', (usersTable) => {

                usersTable.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
                usersTable.text('name');
                usersTable.text('username').unique().notNullable();
                usersTable.text('email').unique().notNullable();
                usersTable.text('password').notNullable();
                usersTable.text('bio');
                usersTable.text('role').notNullable().defaultTo('user');
                usersTable.timestamp('logout').notNullable().defaultTo(knex.raw('now()'));
                usersTable.timestamps();
            })
            .createTable('items', (itemsTable) => {

                itemsTable.increments();
                itemsTable.text('name').notNullable();
                itemsTable.text('location');
                itemsTable.text('type').notNullable();
                itemsTable.date('start_date');
                itemsTable.date('end_date');
                itemsTable.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
                itemsTable.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
            })
            .createTable('lists', (listsTable) => {

                listsTable.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
                listsTable.text('name').notNullable();
                listsTable.uuid('owner').references('id').inTable('users').index().onDelete('CASCADE');
                listsTable.text('description');
            })
            .createTable('list_items', (listitemTable) => {

                listitemTable.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
                listitemTable.integer('item_id').references('id').inTable('items').index().onDelete('CASCADE');
                listitemTable.uuid('list_id').references('id').inTable('lists').index().onDelete('CASCADE');
                listitemTable.text('order');
            })
            .createTable('item_owners', (ownerTable) => {

                ownerTable.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
                ownerTable.text( 'username' ).references( 'username' ).inTable( 'users' ).index().onDelete('CASCADE');
                ownerTable.integer('item_id').references('id').inTable('items').index().onDelete('CASCADE');
            })
            .createTable('tags', (tagsTable) => {

                tagsTable.text('name').primary();
            })
            .createTable('item_tags', (itemtagsTable) => {

                itemtagsTable.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
                itemtagsTable.integer('item_id').references('id').inTable('items').index().onDelete('CASCADE').onUpdate('CASCADE');
                itemtagsTable.text('tag_name').references('name').inTable('tags').index().onDelete('CASCADE').onUpdate('CASCADE');
            })
            .createTable('linked_items', (linkedItemsTable) => {

                linkedItemsTable.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
                linkedItemsTable.integer('item_id').references('id').inTable('items').index().onDelete('CASCADE').onUpdate('CASCADE');
                linkedItemsTable.integer('linked_item_id').references('id').inTable('items').index().onDelete('CASCADE').onUpdate('CASCADE');
            })
    );
};

exports.down = function (knex, Promise) {

    return (
        knex.schema
            .dropTableIfExists('items')
            .dropTableIfExists('users')
            .dropTableIfExists('lists')
            .dropTableIfExists('list_items')
            .dropTableIfExists('item_owners')
            .dropTableIfExists('tags')
            .dropTableIfExists('item_tags')
            .dropTableIfExists('linked_items')
    );
};
