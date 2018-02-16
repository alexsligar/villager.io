'use strict';

exports.seed = function seed(knex, Promise) {

    const tableName = 'tags';
    const rows = [
        {
            name: 'kid-friendly'
        },
        {
            name: 'Food'
        },
        {
            name: 'outdoors'
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
