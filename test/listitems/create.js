'use strict';

const Fixtures = require('../fixtures');
const JWT = require('jsonwebtoken');
const Config = require('getconfig');
// const uuid = require('uuid').v4;
const Server = Fixtures.server;
const db = Fixtures.db;
const { after, before, describe, it } = exports.lab = require('lab').script();
const { expect } = require('code');

describe('POST List Items:', () => {

    let server;
    const list1 = Fixtures.list_id();
    const list2 = Fixtures.list_id();
    const user1 = Fixtures.user_admin();
    const user2 = Fixtures.user_id();
    const event1 = Fixtures.event();
    const event2 = Fixtures.event();
    const event3 = Fixtures.event();
    let item1 = null;
    let item2 = null;
    let item3 = null;

    before(async () => {

        // const token = JWT.sign({ id: user1.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        list1.owner = user1.id;

        server = await Server;

        await Promise.all([
            db.users.insert(user1),
            db.users.insert(user2),
            db.lists.insert(list1)
        ]);

        const items = await Promise.all([
            db.items.insert(event1),
            db.items.insert(event2),
            db.items.insert(event3)
        ]);

        item1 = items[0];
        item2 = items[1];
        item3 = items[2];

        await Promise.all([
            db.items.destroy({ id: item3.id })
        ]);
    });

    after(async () => {

        await Promise.all([
            db.users.destroy({ id: user1.id }),
            db.users.destroy({ id: user2.id }),
            // db.lists.destroy({ id: list1.id }),
            // db.items.destroy({ id: item1.id }),
            db.items.destroy({ id: item2.id })
        ]);
    });

    it('Add List Item - Pass', () => {

        const token = JWT.sign({ id: user1.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);

        const payload = {
            item_id: item1.id,
            list_id: list1.id
        };

        const listItemQuery = {
            method: 'POST',
            url: '/lists/listitems',
            headers: { 'authorization': token },
            payload
        };

        return (
            server.inject(listItemQuery)
                .then((response) => {

                    expect(response.statusCode).to.equal(200);
                })
        );
    });

    it('Add List Item - Forbidden', () => {

        const token = JWT.sign({ id: user2.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);

        const payload = {
            item_id: item2.id,
            list_id: list1.id
        };

        const listItemQuery = {
            method: 'POST',
            url: '/lists/listitems',
            headers: { 'authorization': token },
            payload
        };

        return (
            server.inject(listItemQuery)
                .then((response) => {

                    expect(response.statusCode).to.equal(403);
                })
        );
    });

    it('Add List Item - Item Not Found', () => {

        const token = JWT.sign({ id: user1.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);

        const payload = {
            item_id: item3.id,
            list_id: list1.id
        };

        const listItemQuery = {
            method: 'POST',
            url: '/lists/listitems',
            headers: { 'authorization': token },
            payload
        };

        return (
            server.inject(listItemQuery)
                .then((response) => {

                    expect(response.statusCode).to.equal(404);
                })
        );
    });

    it('Add List Item - List Not Found', () => {

        const token = JWT.sign({ id: user1.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);

        const payload = {
            item_id: item1.id,
            list_id: list2.id
        };

        const listItemQuery = {
            method: 'POST',
            url: '/lists/listitems',
            headers: { 'authorization': token },
            payload
        };

        return (
            server.inject(listItemQuery)
                .then((response) => {

                    expect(response.statusCode).to.equal(404);
                })
        );
    });
});
