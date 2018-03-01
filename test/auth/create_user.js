'use strict';

const Fixtures = require('../fixtures');
const Server = Fixtures.server;
const db = Fixtures.db;

const { after, before, describe, it } = exports.lab = require('lab').script();
const { expect } = require('code');


describe('POST /create_account', () => {

    let server;
    const user = Fixtures.user();
    before(async () => {

        server = await Server;
    });


    after(async () => {

        await Promise.all([
            db.users.destroy({ username: user.username })
        ]);
    });

    it('Create user', () => {

        const payload = user;
        return server.inject({ method: 'post', url: '/create_account', payload }).then((res) => {

            expect(res.statusCode).to.equal(200);
            return res.result;
        });
    });
});
