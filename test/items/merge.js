'use strict';

const Fixtures = require('../fixtures');
const Server = Fixtures.server;
const JWT = require('jsonwebtoken');
const Config = require('getconfig');
const db = Fixtures.db;

const { after, before, describe, it } = exports.lab = require('lab').script();
const { expect } = require('code');


describe('PUT /merge', () => {

    let server;

    const mod = Fixtures.user_mod();
    const user = Fixtures.user_id();

    const event = Fixtures.event();
    const event2 = Fixtures.event();

    let token;

    let newEvent;

    before(async () => {

        server = await Server;

        await Promise.all([
            db.users.insert(mod),
            db.users.insert(user)
        ]);

        newEvent = await Promise.all([
            db.items.insert(event),
            db.items.insert(event2)
        ]);

        await Promise.all([
            db.item_owners.insert({ username: user.username, item_id: newEvent[0].id }),
            db.item_owners.insert({ username: mod.username, item_id: newEvent[1].id })
        ]);

    });

    after(async () => {

        await Promise.all([
            db.items.destroy({ id: newEvent[0].id }),
            db.users.destroy({ id: mod.id }),
            db.users.destroy({ id: user.id })
        ]);
    });

    it('Merge, Correct', async () => {

        token = JWT.sign({ id: mod.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);

        const query = {
            method: 'PUT',
            url: `/merge`,
            headers: { 'Authorization': token },
            payload: {
                'item_id': [
                    newEvent[0].id, newEvent[1].id
                ]
            }
        };

        const response = await server.inject(query);
        expect(response.statusCode).to.equal(200);
    });

    it('Merge, User Token', async () => {

        token = JWT.sign({ id: user.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);

        const query = {
            method: 'PUT',
            url: `/merge`,
            headers: { 'Authorization': token },
            payload: {
                'item_id': [
                    newEvent[0].id, newEvent[1].id
                ]
            }
        };
        const response = await server.inject(query);
        expect(response.statusCode).to.equal(401);
    });

});
