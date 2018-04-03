'use strict';

const Fixtures = require('../fixtures');
const JWT = require('jsonwebtoken');
const Config = require('getconfig');
const Server = Fixtures.server;
const db = Fixtures.db;

const { after, before, describe, it } = exports.lab = require('lab').script();
const { expect } = require('code');

describe('POST Items:', () => {

    const event = Fixtures.event();
    let server;
    const user = Fixtures.user_id();
    const user2 = Fixtures.user_id();
    let token;

    before(async () => {

        await Promise.all([
            db.users.insert(user),
            db.users.insert(user2)
        ]);

        server = await Server;
    });

    after(async () => {

        await Promise.all([
            db.users.destroy({ user_id: user.id }),
            db.users.destroy({ user_id: user2.id }),
            db.items.destroy({ name: event.name })
        ]);
    });

    it('Create item', () => {

        token = JWT.sign({ id: user.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);

        const query1 = {
            method: 'POST',
            url: '/items',
            headers: { 'authorization': token },
            payload: event
        };

        return (
            server.inject(query1)
                .then((response) => {

                    expect(response.statusCode).to.equal(200);
                })
        );
    });

    it('Create item duplicate', () => {

        token = JWT.sign({ id: user2.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);

        const query2 = {
            method: 'POST',
            url: `/items`,
            headers: { 'authorization': token },
            payload: event
        };

        return (
            server.inject(query2)
                .then((response) => {

                    expect(response.statusCode).to.equal(409);
                })
        );
    });
/*
    it('Create list no name', () => {

        list.name = null;
        const query = {
            method: 'POST',
            url: `/lists`,
            headers: { 'authorization': token },
            payload: list
        };

        return (
            server.inject(query)
                .then((response) => {

                    expect(response.statusCode).to.equal(400);
                })
        );
    });*/
});
