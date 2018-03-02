'use strict';

exports.seed = function seed(knex, Promise) {

    const tableName = 'links';
    const rows = [
        {
            item_id: 3,
            linked_item_id: 2
        },
        {
            item_id: 3,
            linked_item_id: 1
        }

    ];

    return (
        knex(tableName)
            .del()
            .then(() => {

                return (
                    knex.insert( rows )
                        .into( tableName )
                );
            })
    );


};
