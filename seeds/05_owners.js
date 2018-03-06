'use strict';

exports.seed = function seed(knex, Promise) {

    const tableName = 'item_owners';
    const rows = [
        {
            username: 'Robfrikaans',
            item_id: 1
        },
        {
            username: 'Robfrikaans',
            item_id: 2
        },
        {
            username: 'Robfrikaans',
            item_id: 3
        },
        {
            username: 'Robfrikaans',
            item_id: 4
        },
        {
            username: 'Randolphin',
            item_id: 5
        },
        {
            username: 'Randolphin',
            item_id: 6
        },
        {
            username: 'Randolphin',
            item_id: 7
        }

    ];

    return (
        knex(tableName)
            .del()
            .then(() => {

                return (
                    knex.insert(rows)
                        .into(tableName)
                );
            })
    );

};
