'use strict';

const Fixtures = require('../fixtures');
const JWT = require('jsonwebtoken');
const Config = require('getconfig');
const Server = Fixtures.server;
const db = Fixtures.db;
const { after, before, describe, it } = exports.lab = require('lab').script();
const { expect } = require('code');

describe('POST Lists:', () => {

    let list1 = Fixtures.list();
    const list2 = Fixtures.list();
    const list3 = Fixtures.list();
    let server;
    let user1 = Fixtures.user();
    let user2 = Fixtures.user();
    const user3 = Fixtures.user_admin();

    before(async () => {

        const user1Query = {
            method: 'POST',
            url: '/create_account',
            payload: user1
        };

        const user2Query = {
            method: 'POST',
            url: '/create_account',
            payload: user2
        };

        const list1Query = {
            method: 'POST',
            url: '/lists',
            payload: list1
        };

        server = await Server;
        await server.inject(user1Query)
            .then((response) => {

                user1 = response.result.data;
            });

        await server.inject(user2Query)
            .then((response) => {

                user2 = response.result.data;
            });

        await Promise.all([
            db.users.insert(user3)
        ]);

        const token = JWT.sign({ id: user1.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        list1Query.headers = { 'Authorization': token };

        await server.inject(list1Query)
            .then((response) => {

                list1 = response.result.data;
            });
    });

    after(async () => {

        await Promise.all([
            db.users.destroy({ username: user1.username }),
            db.users.destroy({ username: user2.username }),
            db.users.destroy({ username: user3.username }),
            db.lists.destroy({ id: list1.id })
        ]);
    });

    it('update list', () => {

        const token = JWT.sign({ id: user1.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        const updateQuery = {
            method: 'PUT',
            headers: { 'authorization': token },
            payload: list2
        };

        updateQuery.url = `/lists/${list1.id}`;

        return (
            server.inject(updateQuery)
                .then((response) => {

                    const { data } = response.result;

                    expect(data.name).to.equal(list2.name);
                    expect(data.description).to.equal(list2.description);
                    expect(response.statusCode).to.equal(200);
                })
        );
    });

    it('update list with no name', () => {

        const token = JWT.sign({ id: user1.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        const updateQuery = {
            method: 'PUT',
            headers: { 'authorization': token },
            payload: {}
        };

        updateQuery.url = `/lists/${list1.id}`;

        return (
            server.inject(updateQuery)
                .then((response) => {

                    expect(response.statusCode).to.equal(400);
                })
        );
    });

    it('Unauthorized update list', () => {

        const token = JWT.sign({ id: user2.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        const updateQuery = {
            method: 'PUT',
            headers: { 'authorization': token },
            payload: list3
        };

        updateQuery.url = `/lists/${list1.id}`;

        return (
            server.inject(updateQuery)
                .then((response) => {

                    expect(response.statusCode).to.equal(401);
                })
        );
    });

    it('admin update list', () => {

        const token = JWT.sign({ id: user3.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        const updateQuery = {
            method: 'PUT',
            headers: { 'authorization': token },
            payload: list3
        };

        updateQuery.url = `/lists/${list1.id}`;

        return (
            server.inject(updateQuery)
                .then((response) => {

                    expect(response.statusCode).to.equal(401);
                })
        );
    });
});
