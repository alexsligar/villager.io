'use strict';

const Fixtures = require('../fixtures');
const JWT = require('jsonwebtoken');
const Config = require('getconfig');
const uuid = require('uuid').v4;
const Server = Fixtures.server;
const db = Fixtures.db;
const { after, before, describe, it } = exports.lab = require('lab').script();
const { expect } = require('code');

describe('GET Lists:', () => {

    let list = Fixtures.list();
    const list2 = Fixtures.list_id();
    const event = Fixtures.event();
    let server;
    const user = Fixtures.user_id();
    let token;
    let item;

    before(async () => {

        server = await Server;

        await Promise.all([
            db.users.insert(user)
        ]);

        list2.owner = user.id;

        item = await Promise.all([
            db.items.insert(event)
        ]);

        await Promise.all([
            db.lists.insert(list2)
        ]);

        await Promise.all([
            db.list_items.insert({ item_id: item[0].id, list_id: list2.id })
        ]);

    });

    after(async () => {

        await Promise.all([
            db.lists.destroy({ id: list.id }),
            db.lists.destroy({ id: list2.id }),
            db.items.destroy({ id: item[0].id }),
            db.users.destroy({ id: user.id })
        ]);
    });

    it('get list', async () => {

        token = JWT.sign({ id: user.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);
        const createQuery = {
            method: 'POST',
            url: '/lists',
            headers: { 'authorization': token },
            payload: list
        };

        const getQuery = {
            method: 'GET'
        };

        await server.inject(createQuery)
            .then((response) => {

                list = response.result.data;
            });

        getQuery.url = `/lists/${list.id}`;

        return (
            server.inject(getQuery)
                .then((response) => {

                    expect(response.statusCode).to.equal(200);
                })
        );
    });

    it('Get list w/ items', () => {

        const getQuery = {
            method: 'GET',
            url: `/lists/${list2.id}`
        };

        return (
            server.inject(getQuery)
                .then((response) => {

                    expect(response.statusCode).to.equal(200);
                })
        );

    });

    it('get invalid list', () => {

        const getQuery = {
            method: 'GET',
            url: `/lists/${uuid()}`
        };

        return (
            server.inject(getQuery)
                .then((response) => {

                    expect(response.statusCode).to.equal(404);
                })
        );
    });
});
