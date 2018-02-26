'use strict';

exports.seed = function seed( knex, Promise ) {

    const tableName = 'users';
    const rows = [
        {
            id: 'e129cc9e-460e-4e52-9573-92e3ff0007ef',
            name: 'Roberto Pierini',
            username: 'Robfrikaans',
            password: 'password',
            email: 'Rob@email.com',
            //bio: 'yup',
            role: 'admin',
            created_at: new Date(),
            updated_at: new Date(),
            logout: new Date()
        }
    ];

    return (
        knex(tableName)
            // Empty the table (DELETE)
            .del()
            .then(() => {

                return (
                    knex.insert( rows )
                        .into(tableName)
                );
            })
    );

};
