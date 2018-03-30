'use strict';

const JWT = require('jsonwebtoken');
const Config = require('getconfig');
const Fixtures = require('../fixtures');
const Server = Fixtures.server;
const db = Fixtures.db;

const { after, before, describe, it } = exports.lab = require('lab').script();
const { expect } = require('code');


describe('GET /items', () => {

    let server;
    const user = Fixtures.user_id();
    const place = Fixtures.place({}, true);

    before(async () => {

        server = await Server;

        await Promise.all([
            db.users.insert(user),
            db.items.insert(place)
        ]);
    });

    after(async () => {

        await Promise.all([
            db.users.destroy({ id: user.id }),
            db.items.destroy({ name: place.name })
        ]);

    });
    it('Get items', () => {

        const token = JWT.sign({ id: user.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        return server.inject({ method: 'get', url: `/items`, headers: { 'Authorization': token } }).then((res) => {

            expect(res.statusCode).to.equal(200);
        });
    });
});
