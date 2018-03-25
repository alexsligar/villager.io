'use strict';

const Fixtures = require('../fixtures');
const JWT = require('jsonwebtoken');
const Config = require('getconfig');
const Server = Fixtures.server;
const db = Fixtures.db;
const { after, before, describe, it } = exports.lab = require('lab').script();
const { expect } = require('code');

describe('POST /lists:', () => {

    const list = Fixtures.list();
    let server;
    let user = Fixtures.user();
    let token;

    before(async () => {

        const query = {
            method: 'POST',
            url: '/create_account',
            payload: user
        };
        server = await Server;
        await server.inject(query)
            .then((response) => {

                user = response.result.data;
            });
    });

    after(async () => {

        await Promise.all([
            db.users.destroy({ username: user.username }),
            db.lists.destroy({ id: list.id })
        ]);
    });

    // it('List list empty', () => {

    //     const query = {
    //         method: 'GET',
    //         url: '/lists'
    //     };

    //     return (
    //         server.inject(query)
    //             .then((response) => {

    //                 expect(response.result.data.length).to.equal(0);
    //                 expect(response.statusCode).to.equal(200);
    //             })
    //     );
    // });

    it('List list', async () => {

        token = JWT.sign({ id: user.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        const createQuery = {
            method: 'POST',
            url: '/lists',
            headers: { 'authorization': token },
            payload: list
        };

        const listQuery = {
            method: 'GET',
            url: '/lists'
        };

        await server.inject(createQuery);

        return (
            server.inject(listQuery)
                .then((response) => {

                    expect(response.statusCode).to.equal(200);
                })
        );
    });
});
