'use strict';

exports.seed = function seed(knex, Promise) {

    const tableName = 'item_owners';
    const rows = [
        {
            user_id: 'e129cc9e-460e-4e52-9573-92e3ff0007ef',
            item_id: '36908dc7-f097-4d4a-9491-76d3c9336e1e'
        },
        {
            user_id: 'e129cc9e-460e-4e52-9573-92e3ff0007ef',
            item_id: '1479e99f-7b35-49c1-ad2d-ed1686c36b4d'
        },
        {
            user_id: 'e129cc9e-460e-4e52-9573-92e3ff0007ef',
            item_id: '33e0bebb-6e75-403f-b55d-b4e47b33638c'
        },
        {
            user_id: 'e129cc9e-460e-4e52-9573-92e3ff0007ef',
            item_id: 'c22355cb-4eaf-4bda-a066-5b978b9c3cc0'
        },
        {
            user_id: '8865b22c-a732-4381-9ba6-e9bc32fc9b99',
            item_id: '8c1e4518-0d0b-46b0-a9c1-1f3345e57bcd'
        },
        {
            user_id: '8865b22c-a732-4381-9ba6-e9bc32fc9b99',
            item_id: '53c46fd1-70c8-4c06-b862-66c113d9c042'
        },
        {
            user_id: '8865b22c-a732-4381-9ba6-e9bc32fc9b99',
            item_id: 'c1da1798-0a44-4d75-8ccb-bb6c042430a1'
        },
        {
            user_id: 'e129cc9e-460e-4e52-9573-92e3ff0007ef',
            item_id: '0d6793ce-1d99-4948-bcdf-a1e16c5beb31'
        },
        {
            user_id: '8865b22c-a732-4381-9ba6-e9bc32fc9b99',
            item_id: 'a4270fcf-db4e-4eac-b96f-669e96c3f000'
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
