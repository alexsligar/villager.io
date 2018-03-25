'use strict';

const JWT = require('jsonwebtoken');
const Config = require('getconfig');
const Fixtures = require('../fixtures');
const Server = Fixtures.server;
const db = Fixtures.db;

const { after, before, describe, it } = exports.lab = require('lab').script();
const { expect } = require('code');

describe('PUT /{username}/role', () => {

    let server;
    const admin = Fixtures.user_admin();
    const mod = Fixtures.user_mod();
    const user1 = Fixtures.user_id();
    const user2 = Fixtures.user_id();
    const user3 = Fixtures.user_id();

    before(async () => {

        server = await Server;

        await Promise.all([
            db.users.insert(admin),
            db.users.insert(mod),
            db.users.insert(user1),
            db.users.insert(user2)
        ]);
    });

    after(async () => {

        await Promise.all([
            db.users.destroy({ id: admin.id }),
            db.users.destroy({ id: mod.id }),
            db.users.destroy({ id: user1.id }),
            db.users.destroy({ id: user2.id })
        ]);

    });
    it('Update role - Unauthorized w/ User', () => {

        const token = JWT.sign({ id: user1.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        const query = {
            method: 'PUT',
            url: `/${user2.username}/role`,
            headers: { 'authorization': token },
            payload: { 'role': 'admin' }
        };

        return server.inject(query)
            .then((response) => {

                expect(response.statusCode).to.equal(401);
            });
    });

    it('Update role - Unauthorized w/ Mod', () => {

        const token = JWT.sign({ id: mod.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        const query = {
            method: 'PUT',
            url: `/${user2.username}/role`,
            headers: { 'authorization': token },
            payload: { 'role': 'admin' }
        };

        return server.inject(query)
            .then((response) => {

                expect(response.statusCode).to.equal(401);
            });
    });

    it('Update role - Not Found', () => {

        const token = JWT.sign({ id: mod.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        const query = {
            method: 'PUT',
            url: `/${user3.username}/role`,
            headers: { 'authorization': token },
            payload: { 'role': 'mod' }
        };

        return server.inject(query)
            .then((response) => {

                expect(response.statusCode).to.equal(404);
            });
    });

    it('Update role - Valid Mod Update', () => {

        const token = JWT.sign({ id: mod.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        const query = {
            method: 'PUT',
            url: `/${user2.username}/role`,
            headers: { 'authorization': token },
            payload: { 'role': 'mod' }
        };

        return server.inject(query)
            .then((response) => {

                expect(response.statusCode).to.equal(200);
                expect(response.result.role).to.equal(user2.role);
            });
    });

    it('Update role - Valid Admin Update', () => {

        const token = JWT.sign({ id: admin.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        const query = {
            method: 'PUT',
            url: `/${user2.username}/role`,
            headers: { 'authorization': token },
            payload: { 'role': 'admin' }
        };

        return server.inject(query)
            .then((response) => {

                expect(response.statusCode).to.equal(200);
                expect(response.result.role).to.equal(user2.role);
            });
    });
});
