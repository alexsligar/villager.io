'use strict';

const JWT = require('jsonwebtoken');
const Config = require('getconfig');
const Fixtures = require('../fixtures');
const Server = Fixtures.server;
const db = Fixtures.db;

const { after, before, describe, it } = exports.lab = require('lab').script();
const { expect } = require('code');


describe('DELETE /items/{id}', () => {

    let server;

    const user = Fixtures.user_id();
    const invalidUser = Fixtures.user_id();
    const admin = Fixtures.user_admin();

    const event = Fixtures.event();
    const multiEvent = Fixtures.event();
    const listEvent = Fixtures.event();

    const list = Fixtures.list();

    let newEvent;
    let newMultiEvent;
    let newListEvent;
    let newList;

    before(async () => {

        server = await Server;
        newEvent = await Promise.all([
            db.items.insert(event)
        ]);
        newMultiEvent = await Promise.all([
            db.items.insert(multiEvent)
        ]);
        newListEvent = await Promise.all([
            db.items.insert(listEvent)
        ]);
        await Promise.all([
            db.users.insert(user)
        ]);
        await Promise.all([
            db.item_owners.insert({ username: user.username, item_id: newEvent[0].id })
        ]);
        await Promise.all([
            db.users.insert(invalidUser)
        ]);
        await Promise.all([
            db.item_owners.insert({ username: user.username, item_id: newMultiEvent[0].id })
        ]);
        await Promise.all([
            db.item_owners.insert({ username: invalidUser.username, item_id: newMultiEvent[0].id })
        ]);
        await Promise.all([
            db.item_owners.insert({ username: user.username, item_id: newListEvent[0].id })
        ]);
        await Promise.all([
            db.users.insert(admin)
        ]);

        const listQuery = {
            method: 'POST',
            url: '/lists',
            payload: list
        };

        const token = JWT.sign({ id: user.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        listQuery.headers = { 'Authorization': token };

        await server.inject(listQuery)
            .then((response) => {

                newList = response.result.data;
            });

        const addItemQuery = {
            method: 'POST',
            headers: { 'authorization': token },
            payload: { 'list_id' : `${ newList.id }`,
                'item_id' : `${ newListEvent[0].id }` }
        };

        addItemQuery.url = `/lists/listitems`;

        await server.inject(addItemQuery)
            .then((response) => {

            });


    });

    after(async () => {

        await Promise.all([
            db.items.destroy({ id: newMultiEvent[0].id }),
            db.items.destroy({ id: newListEvent[0].id })
        ]);
        await Promise.all([
            db.users.destroy({ id: user.id }),
            db.users.destroy({ id: invalidUser.id }),
            db.users.destroy({ id: admin.id })
        ]);
        await Promise.all([
            db.lists.destroy({ id: newList.id })
        ]);
    });

    it('Destroy item', () => {

        const token = JWT.sign({ id: user.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        const payload = { username: user.username };
        return server.inject({ method: 'delete', url: `/items/${ newEvent[0].id }`, payload, headers: { 'Authorization': token } }).then((res) => {

            expect(res.statusCode).to.equal(200);
        });
    });

    it('Invalid user destroy item', () => {

        const token = JWT.sign({ id: invalidUser.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        const payload = { username: user.username };
        return server.inject({ method: 'delete', url: `/items/${ newListEvent[0].id }`, payload, headers: { 'Authorization': token } }).then((res) => {

            expect(res.statusCode).to.equal(401);
        });
    });

    it('Destroy item with multiple owners', () => {

        const token = JWT.sign({ id: user.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        const payload = { username: user.username };
        return server.inject({ method: 'delete', url: `/items/${ newMultiEvent[0].id }`, payload, headers: { 'Authorization': token } }).then((res) => {

            expect(res.statusCode).to.equal(412);
        });
    });

    it('Non-user (admin) destroy item', () => {

        const token = JWT.sign({ id: admin.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        const payload = { username: user.username };
        return server.inject({ method: 'delete', url: `/items/${ newMultiEvent[0].id }`, payload, headers: { 'Authorization': token } }).then((res) => {

            expect(res.statusCode).to.equal(412);
        });
    });

    it('Item does not exist', () => {

        const token = JWT.sign({ id: admin.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        const payload = { username: admin.username };
        const nonItem = newEvent[0].id + 100;
        return server.inject({ method: 'delete', url: `/items/${nonItem}`, payload, headers: { 'Authorization': token } }).then((res) => {

            expect(res.statusCode).to.equal(404);
        });
    });

    it('Item in a list', () => {

        const token = JWT.sign({ id: user.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        const payload = { username: user.username };
        return server.inject({ method: 'delete', url: `/items/${ newListEvent[0].id }`, payload, headers: { 'Authorization': token } }).then((res) => {

            expect(res.statusCode).to.equal(412);
        });
    });
});
