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

    const user = Fixtures.user_id();
    let token;
    let listID;

    before(async () => {

        server = await Server;

        await Promise.all([
            db.users.insert(user)
        ]);
    });

    after(async () => {

        await Promise.all([
            db.users.destroy({ id: user.id }),
            db.lists.destroy({ id: listID })
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

                    listID = response.result.data.id;
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
