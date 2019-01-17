'use strict';

const JWT = require('jsonwebtoken');
const Config = require('getconfig');
const Fixtures = require('../fixtures');

const Server = Fixtures.server;
const db = Fixtures.db;

const { after, before, describe, it } = exports.lab = require('lab').script();
const { expect } = require('code');


describe('PUT /users/{username}', () => {

    let server;

    let user = Fixtures.user_id();
    const user2 = Fixtures.user_id();

    before(async () => {

        server = await Server;

        await Promise.all([
            db.users.insert(user),
            db.users.insert(user2)
        ]);
    });

    after(async () => {

        await Promise.all([
            db.users.destroy({ id: user.id }),
            db.users.destroy({ id: user2.id })
        ]);

    });
    it('Update user', () => {

        const updated_user = Fixtures.user();
        const token = JWT.sign({ id: user.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        return server.inject({ method: 'put', url: `/users/${ user.username }`, headers: { 'Authorization': token }, payload: updated_user }).then((res) => {

            expect(res.statusCode).to.equal(200);
            return res.result;
        }).then((result) => {

            return server.inject({ method: 'get', url: '/users/profile', headers: { 'Authorization': token } });
        }).then((res) => {

            expect(res.statusCode).to.equal(200);
            return res.result;
        }).then((result) => {

            updated_user.id = user.id;
            user = updated_user;
            delete updated_user.password;
            expect(result.data).to.include(updated_user);
        });
    });

    it('Update user without username', () => { //for code coverage

        const updated_user = Fixtures.user();
        delete updated_user.username;

        const token = JWT.sign({ id: user.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        return server.inject({ method: 'put', url: `/users/${ user.username }`, headers: { 'Authorization': token }, payload: updated_user }).then((res) => {

            expect(res.statusCode).to.equal(200);
            return res.result;
        }).then((result) => {

            return server.inject({ method: 'get', url: '/users/profile', headers: { 'Authorization': token } });
        }).then((res) => {

            expect(res.statusCode).to.equal(200);
            return res.result;
        }).then((result) => {

            updated_user.id = user.id;
            updated_user.username = user.username;

            user = updated_user;
            delete updated_user.password;
            expect(result.data).to.include(updated_user);
        });
    });

    it('Update user without email', () => { //for code coverage

        const updated_user = Fixtures.user();
        delete updated_user.email;

        const token = JWT.sign({ id: user.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        return server.inject({ method: 'put', url: `/users/${ user.username }`, headers: { 'Authorization': token }, payload: updated_user }).then((res) => {

            expect(res.statusCode).to.equal(200);
            return res.result;
        }).then((result) => {

            return server.inject({ method: 'get', url: '/users/profile', headers: { 'Authorization': token } });
        }).then((res) => {

            expect(res.statusCode).to.equal(200);
            return res.result;
        }).then((result) => {

            updated_user.id = user.id;
            updated_user.email = user.email;

            user = updated_user;
            delete updated_user.password;
            expect(result.data).to.include(updated_user);
        });
    });

    it('Update user as different user', () => {

        const updated_user = Fixtures.user();
        const token = JWT.sign({ id: user2.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        return server.inject({ method: 'put', url: `/users/${ user.username }`, headers: { 'Authorization': token }, payload: updated_user }).then((res) => {

            expect(res.statusCode).to.equal(401);
        });
    });

    it('Update user as duplicate username', () => {

        const updated_user = Fixtures.user();
        updated_user.username = user2.username;
        const token = JWT.sign({ id: user.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        return server.inject({ method: 'put', url: `/users/${ user.username }`, headers: { 'Authorization': token }, payload: updated_user }).then((res) => {

            expect(res.statusCode).to.equal(409);
        });
    });

    it('Update user with duplicate email', () => {

        const updated_user = Fixtures.user();
        updated_user.email = user2.email;
        const token = JWT.sign({ id: user.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        return server.inject({ method: 'put', url: `/users/${ user.username }`, headers: { 'Authorization': token }, payload: updated_user }).then((res) => {

            expect(res.statusCode).to.equal(409);
        });
    });

    it('Update fake user', () => {

        const updated_user = Fixtures.user();
        const fake = Fixtures.user_id();
        const token = JWT.sign({ id: user.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        return server.inject({ method: 'put', url: `/users/${ fake.username }`, headers: { 'Authorization': token }, payload: updated_user }).then((res) => {

            expect(res.statusCode).to.equal(404);
        });
    });

});
