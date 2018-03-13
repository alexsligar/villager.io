'use strict';

exports.seed = function seed(knex, Promise) {

    const tableName = 'tags';
    const rows = [
        {
            name: 'kid-friendly'
        },
        {
            name: 'restaurants'
        },
        {
            name: 'outdoors'
        },
        {
            name: 'university'
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
