'use strict';

exports.seed = function seed(knex, Promise) {

    const tableName = 'items';
    const rows = [
        {//1
            name: 'WSUTC',
            location: '2710 Crimson Way, Richland, WA 99354',
            type: 'place'
        },
        {//2
            name: 'Dive in Diner',
            location: '2000 Fire ln, Flavor Town, USA',
            type: 'place'
        },
        {//3
            name: 'Howard Amon Park',
            location: '900 Amon Park Rd N, Richland, WA',
            type: 'activity'
        },
        {//4
            name: 'Coding Cougs',
            location: '2710 Crimson Way, Richland, WA 99354',
            type: 'group'
        },
        {//5
            name: 'Casa Mia',
            location: '607 George Washington Way, Richland, WA 99354',
            type: 'place'
        },
        {//6
            name: 'Bangkok Thai Cuisine',
            location: '8318 W Gage Blvd, Kennewick, WA 99336',
            type: 'place'
        },
        {//7
            name: 'Fiesta Mexican Restaurant & Catering',
            location: '8524 W Gage Blvd #130, Kennewick, WA 99336',
            type: 'place'
        },
        {//8
            name: 'Fiesta Mexican Restaurant',
            location: '8524 W Gage Blvd #130, Kennewick, WA 99336',
            type: 'place'
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
