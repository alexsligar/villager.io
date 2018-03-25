'use strict';

const Fixtures = require('../fixtures');
const JWT = require('jsonwebtoken');
const Config = require('getconfig');
const Server = Fixtures.server;
const db = Fixtures.db;

const { after, before, describe, it } = exports.lab = require('lab').script();
const { expect } = require('code');

describe('POST Lists:', () => {

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

    it('Create list', () => {

        token = JWT.sign({ id: user.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        const query = {
            method: 'POST',
            url:    `/lists`,
            headers: { 'authorization': token },
            payload: list
        };
        return (
            server.inject(query)
                .then((response) => {

                    expect(response.statusCode).to.equal(200);
                })
        );
    });

    it('Create list duplicate', () => {

        const query = {
            method: 'POST',
            url:    `/lists`,
            headers: { 'authorization': token },
            payload: list
        };

        return (
            server.inject(query)
                .then((response) => {

                    expect(response.statusCode).to.equal(409);
                })
        );
    });

    it('Create list no name', () => {

        list.name = null;
        const query = {
            method: 'POST',
            url:    `/lists`,
            headers: { 'authorization': token },
            payload: list
        };

        return (
            server.inject(query)
                .then((response) => {

                    expect(response.statusCode).to.equal(400);
                })
        );
    });
});
