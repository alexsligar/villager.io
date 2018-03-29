'use strict';

const Fixtures = require('../fixtures');
const JWT = require('jsonwebtoken');
const Config = require('getconfig');
const Server = Fixtures.server;
const db = Fixtures.db;

const { after, before, describe, it } = exports.lab = require('lab').script();
const { expect } = require('code');

describe('POST Lists:', () => {

    let server;
    const user = Fixtures.user_id();
    const mod = Fixtures.user_mod();
    const tag1 = Fixtures.tag();
    const tag2 = Fixtures.tag();

    before(async () => {

        server = await Server;
        await Promise.all([
            db.users.insert(user),
            db.users.insert(mod)
        ]);

        await Promise.all([
            db.tags.insert(tag1)
        ]);
    });

    after(async () => {

        await Promise.all([
            db.users.destroy({ username: user.username }),
            db.users.destroy({ username: mod.username }),
            db.tags.destroy({ name: tag1.name })
        ]);
    });

    it('Delete tag unauthorized', () => {

        const token = JWT.sign({ id: user.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        const query = {
            method: 'DELETE',
            url:    `/tags`,
            headers: { 'authorization': token },
            payload: tag1
        };
        return (
            server.inject(query)
                .then((response) => {

                    expect(response.statusCode).to.equal(401);
                })
        );
    });

    it('Delete tag non-existing', () => {

        const token = JWT.sign({ id: mod.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        const query = {
            method: 'DELETE',
            url:    `/tags`,
            headers: { 'authorization': token },
            payload: tag2
        };
        return (
            server.inject(query)
                .then((response) => {

                    expect(response.statusCode).to.equal(404);
                })
        );
    });


    it('Delete tag', () => {

        const token = JWT.sign({ id: mod.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        const query = {
            method: 'DELETE',
            url:    `/tags`,
            headers: { 'authorization': token },
            payload: tag1
        };
        return (
            server.inject(query)
                .then((response) => {

                    expect(response.statusCode).to.equal(200);
                })
        );
    });
});
