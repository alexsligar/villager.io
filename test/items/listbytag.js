'use strict';

const JWT = require('jsonwebtoken');
const Config = require('getconfig');
const Fixtures = require('../fixtures');
const Server = Fixtures.server;
const db = Fixtures.db;

const { after, before, describe, it } = exports.lab = require('lab').script();
const { expect } = require('code');


describe('GET /items/tags/{name}', () => {

    let server;

    const user = Fixtures.user_id();
    const place = Fixtures.place();
    const tag = Fixtures.tag();
    let newPlace;

    before(async () => {

        server = await Server;

        newPlace = await Promise.all([
            db.items.insert(place)
        ]);
        await Promise.all([
            db.users.insert(user),
            db.tags.insert(tag),
            db.item_tags.insert({ item_id: newPlace[0].id, tag_name: tag.name })
        ]);
    });

    after(async () => {

        await Promise.all([
            db.users.destroy({ id: user.id }),
            db.items.destroy({ id: newPlace[0].id }),
            db.tags.destroy({ name: tag.name })
        ]);

    });
    it('list by tag', () => {

        const token = JWT.sign({ id: user.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        return server.inject({ method: 'get', url: `/items/tags/${tag.name}`, headers: { 'Authorization': token } }).then((res) => {

            expect(res.statusCode).to.equal(200);
        });
    });
});
