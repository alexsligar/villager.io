'use strict';

const Fixtures = require('../fixtures');
const JWT = require('jsonwebtoken');
const Config = require('getconfig');
const uuid = require('uuid').v4;
const Server = Fixtures.server;
const db = Fixtures.db;
const { after, before, describe, it } = exports.lab = require('lab').script();
const { expect } = require('code');

describe('POST Lists:', () => {

    let list = Fixtures.list();
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

    it('get list', async () => {

        token = JWT.sign({ id: user.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        const createQuery = {
            method: 'POST',
            url: '/lists',
            headers: { 'authorization': token },
            payload: list
        };

        const getQuery = {
            method: 'GET'
        };

        await server.inject(createQuery)
            .then((response) => {

                list = response.result.data;
            });

        getQuery.url = `/lists/${list.id}`;

        return (
            server.inject(getQuery)
                .then((response) => {

                    expect(response.statusCode).to.equal(200);
                })
        );
    });

    it('get invalid list', () => {

        const getQuery = {
            method: 'GET',
            url: `/lists/${uuid()}`
        };

        return (
            server.inject(getQuery)
                .then((response) => {

                    expect(response.statusCode).to.equal(404);
                })
        );
    });
});
