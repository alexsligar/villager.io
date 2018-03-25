'use strict';

const JWT = require('jsonwebtoken');
const Config = require('getconfig');
const Fixtures = require('../fixtures');
const Server = Fixtures.server;
const db = Fixtures.db;

const { after, before, describe, it } = exports.lab = require('lab').script();
const { expect } = require('code');


describe('DELETE /item_owners', () => {

    let server;
    const user = Fixtures.user_id();
    const event = Fixtures.event();
    const admin = Fixtures.user_admin();
    let newEvent;

    before(async () => {

        server = await Server;
        newEvent = await Promise.all([
            db.items.insert(event)
        ]);
        await Promise.all([
            db.users.insert(user)
        ]);
        await Promise.all([
            db.users.insert(admin)
        ]);
        await Promise.all([
            db.item_owners.insert({ username: user.username, item_id: newEvent[0].id })
        ]);
    });

    after(async () => {

        await Promise.all([
            db.items.destroy({ id: newEvent[0].id })
        ]);
        await Promise.all([
            db.users.destroy({ id: user.id })
        ]);
        await Promise.all([
            db.users.destroy({ id: admin.id })
        ]);
    });
    it('Destory owner as user', () => {

        const token = JWT.sign({ id: user.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        const payload = { username: user.username, item_id: newEvent[0].id };
        return server.inject({ method: 'delete', url: '/item_owners', payload, headers: { 'Authorization': token } }).then((res) => {

            expect(res.statusCode).to.equal(401);
        });
    });
    it('Destory owner', () => {

        const token = JWT.sign({ id: admin.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        const payload = { username: user.username, item_id: newEvent[0].id };
        return server.inject({ method: 'delete', url: '/item_owners', payload, headers: { 'Authorization': token } }).then((res) => {

            expect(res.statusCode).to.equal(204);
        });
    });
    it('Destory owner that does not exist', () => {

        const token = JWT.sign({ id: admin.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        const payload = { username: user.username, item_id: newEvent[0].id };
        return server.inject({ method: 'delete', url: '/item_owners', payload, headers: { 'Authorization': token } }).then((res) => {

            expect(res.statusCode).to.equal(404);
        });
    });
});
