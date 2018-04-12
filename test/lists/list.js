'use strict';

const Fixtures = require('../fixtures');
const JWT = require('jsonwebtoken');
const Config = require('getconfig');
const Server = Fixtures.server;
const db = Fixtures.db;
const { after, before, describe, it } = exports.lab = require('lab').script();
const { expect } = require('code');

describe('POST /lists:', () => {

    let server;

    const list = Fixtures.list();
    const user = Fixtures.user_id();
    let token;

    before(async () => {

        server = await Server;

        await Promise.all([
            db.users.insert(user)
        ]);
    });

    after(async () => {

        await Promise.all([
            db.users.destroy({ id: user.id }),
            db.lists.destroy({ id: list.id })
        ]);
    });

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
