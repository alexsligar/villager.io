'use strict';

const Fixtures = require('../fixtures');

const Server = Fixtures.server;
const db = Fixtures.db;

const { after, before, describe, it } = exports.lab = require('lab').script();
const { expect } = require('code');

describe('POST /login', () => {

    let server;
    const user = Fixtures.user();
    const user_random = Fixtures.user();

    before(async () => {

        server = await Server;
        const payload = user;
        await server.inject({ method: 'post', url: '/users', payload });
    });


    after(async () => {

        await Promise.all([
            db.users.destroy({ username: user.username })
        ]);
    });

    it('login', () => {

        const payload = { username: user.username, password: user.password };
        return server.inject({ method: 'post', url: '/login', payload }).then((res) => {

            expect(res.statusCode).to.equal(200);
        });
    });
    it('login wrong password', () => {

        const payload = { username: user.username, password: user_random.password  };
        return server.inject({ method: 'post', url: '/login', payload }).then((res) => {

            expect(res.statusCode).to.equal(401);
        });
    });
});
