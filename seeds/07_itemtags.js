'use strict';

exports.seed = function seed(knex, Promise) {

    const tableName = 'item_tags';
    const rows = [
        {
            tag_name: 'kid-friendly',
            item_id: 1
        },
        {
            tag_name: 'restaurants',
            item_id: 2
        },
        {
            tag_name: 'outdoors',
            item_id: 3
        },
        {
            tag_name: 'kid-friendly',
            item_id: 3
        },
        {
            tag_name: 'university',
            item_id: 4
        },
        {
            tag_name: 'university',
            item_id: 1
        },
        {
            tag_name: 'restaurants',
            item_id: 5
        },
        {
            tag_name: 'restaurants',
            item_id: 6
        },
        {
            tag_name: 'restaurants',
            item_id: 7
        },
        {
            tag_name: 'kid-friendly',
            item_id: 5
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
