'use strict';

const JWT = require('jsonwebtoken');
const Config = require('getconfig');
const Fixtures = require('../fixtures');
const Server = Fixtures.server;
const db = Fixtures.db;

const { after, before, describe, it } = exports.lab = require('lab').script();
const { expect } = require('code');


describe('DELETE /users', () => {

    let server;
    const user = Fixtures.user_id();
    const userdel = Fixtures.user_id();
    const userdel2 = Fixtures.user_id();
    const admin = Fixtures.user_admin();

    before(async () => {

        server = await Server;

        await Promise.all([
            db.users.insert(user)
        ]);
        await Promise.all([
            db.users.insert(userdel)
        ]);
        await Promise.all([
            db.users.insert(userdel2)
        ]);
        await Promise.all([
            db.users.insert(admin)
        ]);
    });

    after(async () => {

        await Promise.all([
            db.users.destroy({ id: user.id })
        ]);
        await Promise.all([
            db.users.destroy({ id: admin.id })
        ]);
    });
    it('Delete as different user', () => {

        const token = JWT.sign({ id: user.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        return server.inject({ method: 'delete', url: `/users/${ userdel.username }`, headers: { 'Authorization': token } }).then((res) => {

            expect(res.statusCode).to.equal(401);
        });
    });
    it('Delete own account as user', () => {

        const token = JWT.sign({ id: userdel2.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        return server.inject({ method: 'delete', url: `/users/${ userdel2.username }`, headers: { 'Authorization': token } }).then((res) => {

            expect(res.statusCode).to.equal(204);
        });
    });
    it('Delete as admin', () => {

        const token = JWT.sign({ id: admin.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        return server.inject({ method: 'delete', url: `/users/${ userdel.username }`, headers: { 'Authorization': token } }).then((res) => {

            expect(res.statusCode).to.equal(204);
        });
    });
    it('Delete as fake', () => {

        const fake = Fixtures.user_id();
        const token = JWT.sign({ id: admin.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        return server.inject({ method: 'delete', url: `/users/${ fake.username }`, headers: { 'Authorization': token } }).then((res) => {

            expect(res.statusCode).to.equal(404);
        });
    });
});
