'use strict';

exports.seed = function seed(knex, Promise) {

    const tableName = 'items';
    const rows = [
        {
            name: 'WSUTC',
            location: '2710 Crimson Way, Richland, WA 99354',
            type: 'place'
        },
        {
            name: 'Dinner',
            location: '2000 Flavor Town, USA',
            type: 'place'
        },
        {
            name: 'Howard Amon Park',
            location: '900 Amon Park Rd N, Richland, WA',
            type: 'activity'
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
