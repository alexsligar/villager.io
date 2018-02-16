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
