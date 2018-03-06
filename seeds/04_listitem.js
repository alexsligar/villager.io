'use strict';

exports.seed = function seed( knex, Promise ) {

    const tableName = 'list_items';
    const rows = [
        {
            id: '4db4aa8a-09b4-4202-9042-fa2d2adca612',
            item_id: 2,
            list_id: 'e129cc9e-460e-4e52-9573-92e3ff0007ef'
        },
        {
            id: '1228bf48-a2f8-40b4-8983-526cf8b7c82b',
            item_id: 3,
            list_id: 'e129cc9e-460e-4e52-9573-92e3ff0007ef'
        },
        {
            id: '24e155c7-76f0-4ab6-9624-fea68f072a6f',
            item_id: 4,
            list_id: '1a9d09e7-a27e-414d-9417-01ea01669a59'
        },
        {
            id: '76994248-f8a9-4538-86da-388a07a80586',
            item_id: 5,
            list_id: '269fffd8-a550-4871-8af2-db6eda3d6fb4'
        },
        {
            id: '2cdedc96-8461-412c-8d3f-72f6c7ba9e6a',
            item_id: 6,
            list_id: '269fffd8-a550-4871-8af2-db6eda3d6fb4'
        },
        {
            id: '925714a2-6f28-4dce-8e03-ba892c39b976',
            item_id: 7,
            list_id: '269fffd8-a550-4871-8af2-db6eda3d6fb4'
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
