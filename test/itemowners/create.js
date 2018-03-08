'use strict';

const JWT = require('jsonwebtoken');
const Config = require('getconfig');
const Fixtures = require('../fixtures');
const Server = Fixtures.server;
const db = Fixtures.db;

const { after, before, describe, it } = exports.lab = require('lab').script();
const { expect } = require('code');


describe('POST /item_owners', () => {

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
    });


    after(async () => {

        await Promise.all([
            db.items.destroy(newEvent[0])
        ]);
        await Promise.all([
            db.users.destroy(user)
        ]);
        await Promise.all([
            db.users.destroy(admin)
        ]);
    });

    it('Create owner', () => {

        const token = JWT.sign({ id: admin.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        const payload = { username: user.username, item_id: newEvent[0].id };
        return server.inject({ method: 'post', url: '/item_owners', payload, headers: { 'Authorization': token } }).then((res) => {

            expect(res.statusCode).to.equal(200);
        });
    });
    it('Create owner duplicate', () => {

        const token = JWT.sign({ id: admin.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        const payload = { username: user.username, item_id: newEvent[0].id };
        return server.inject({ method: 'post', url: '/item_owners', payload, headers: { 'Authorization': token } }).then((res) => {

            expect(res.statusCode).to.equal(409);
        });
    });
});
