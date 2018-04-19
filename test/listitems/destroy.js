'use strict';

const Fixtures = require('../fixtures');
const JWT = require('jsonwebtoken');
const Config = require('getconfig');
// const uuid = require('uuid').v4;
const Server = Fixtures.server;
const db = Fixtures.db;
const { after, before, describe, it } = exports.lab = require('lab').script();
const { expect } = require('code');

describe('Destroy List Items:', () => {

    let server;

    const list = Fixtures.list();
    const nolist = Fixtures.list_id();

    const admin = Fixtures.user_admin();
    const nonAuth = Fixtures.user_id();

    const event1 = Fixtures.event();
    const event2 = Fixtures.event();

    let item1 = null;
    let item2 = null;

    before(async () => {

        server = await Server;

        await Promise.all([
            db.users.insert(admin),
            db.users.insert(nonAuth)
        ]);

        const items = await Promise.all([
            db.items.insert(event1),
            db.items.insert(event2)
        ]);

        item1 = items[0];
        item2 = items[1];

        const token = JWT.sign({ id: admin.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);

        const listQuery = {
            method: 'POST',
            url:    `/lists`,
            headers: { 'authorization': token },
            payload: list
        };

        await server.inject(listQuery)
            .then((response) => {

                list.id = response.result.data.id;
            });

        const listItemQuery = {
            method: 'POST',
            url: '/lists/listitems',
            headers: { 'authorization': token },
            payload: {
                item_id: item1.id,
                list_id: list.id
            }
        };

        await server.inject(listItemQuery);
    });

    after(async () => {

        await Promise.all([
            db.users.destroy({ id: nonAuth.id }),
            db.users.destroy({ id: admin.id }),
            db.lists.destroy({ id: list.id }),
            db.items.destroy({ id: item1.id }),
            db.items.destroy({ id: item2.id })
        ]);
    });

    it('Delete List Item - 200', () => {

        const token = JWT.sign({ id: admin.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        const payload = {
            list_id: list.id,
            item_id: item1.id
        };
        const query = {
            method: 'DELETE',
            url: '/lists/listitems',
            headers: { 'authorization': token },
            payload
        };

        return (
            server.inject(query)
                .then((response) => {

                    expect(response.statusCode).to.equal(200);
                })
        );
    });

    it('Delete List Item - Item 404', () => {

        const token = JWT.sign({ id: admin.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        const payload = {
            list_id: list.id,
            item_id: (item2.id + 100)
        };
        const query = {
            method: 'DELETE',
            url: '/lists/listitems',
            headers: { 'authorization': token },
            payload
        };

        return (
            server.inject(query)
                .then((response) => {

                    expect(response.statusCode).to.equal(404);
                })
        );
    });

    it('Delete List Item - List 404', () => {

        const token = JWT.sign({ id: admin.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        const payload = {
            list_id: nolist.id,
            item_id: item1.id
        };
        const query = {
            method: 'DELETE',
            url: '/lists/listitems',
            headers: { 'authorization': token },
            payload
        };

        return (
            server.inject(query)
                .then((response) => {

                    expect(response.statusCode).to.equal(404);
                })
        );
    });

    it('Delete List Item - User 401', () => {

        const token = JWT.sign({ id: nonAuth.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        const payload = {
            list_id: list.id,
            item_id: item2.id
        };
        const query = {
            method: 'DELETE',
            url: '/lists/listitems',
            headers: { 'authorization': token },
            payload
        };

        return (
            server.inject(query)
                .then((response) => {

                    expect(response.statusCode).to.equal(401);
                })
        );
    });
});
