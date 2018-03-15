'use strict';

const JWT = require('jsonwebtoken');
const Config = require('getconfig');
const Fixtures = require('../fixtures');
const Server = Fixtures.server;
const db = Fixtures.db;

const { after, before, describe, it } = exports.lab = require('lab').script();
const { expect } = require('code');


describe('GET /users/{username}/favorites', () => {

    let server;
    const user = Fixtures.user_id();
    const user2 = Fixtures.user_id();
    const event = Fixtures.event();
    const list = Fixtures.list();
    const list2 = Fixtures.list();

    list.id = user.id;
    list.owner = user.id;
    list.name = 'starred';

    list2.id = user2.id;
    list2.owner = user2.id;
    list2.name = 'starred';

    let newEvent;
    before(async () => {

        server = await Server;

        await Promise.all([
            db.users.insert(user)
        ]);
        await Promise.all([
            db.users.insert(user2)
        ]);
        newEvent = await Promise.all([
            db.items.insert(event)
        ]);
        await Promise.all([
            db.lists.insert(list)
        ]);
        await Promise.all([
            db.lists.insert(list2)
        ]);

        await Promise.all([
            db.list_items.insert({ list_id: user.id, item_id: newEvent[0].id })
        ]);
    });

    after(async () => {

        await Promise.all([
            db.users.destroy({ id: user.id })
        ]);
        await Promise.all([
            db.items.destroy({ id: newEvent[0].id })
        ]);
        await Promise.all([
            db.lists.destroy({ id: list.id })
        ]);
        await Promise.all([
            db.users.destroy({ id: user2.id })
        ]);
        await Promise.all([
            db.lists.destroy({ id: list2.id })
        ]);

    });
    it('Get favorite list', () => {

        const token = JWT.sign({ id: user.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        return server.inject({ method: 'get', url: `/users/${ user.username }/favorites`, headers: { 'Authorization': token } }).then((res) => {

            expect(res.statusCode).to.equal(200);
        });
    });
    it('Get favorite list empty', () => {

        const token = JWT.sign({ id: user.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        return server.inject({ method: 'get', url: `/users/${ user2.username }/favorites`, headers: { 'Authorization': token } }).then((res) => {

            expect(res.statusCode).to.equal(404);
        });
    });
    it('Get favorite list fake user', () => {

        const fake = Fixtures.user_id();
        const token = JWT.sign({ id: user.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        return server.inject({ method: 'get', url: `/users/${ fake.username }/favorites`, headers: { 'Authorization': token } }).then((res) => {

            expect(res.statusCode).to.equal(404);
        });
    });
});
