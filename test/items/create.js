'use strict';

const Fixtures = require('../fixtures');
const JWT = require('jsonwebtoken');
const Config = require('getconfig');
const Server = Fixtures.server;
const db = Fixtures.db;

const { after, before, describe, it } = exports.lab = require('lab').script();
const { expect } = require('code');

describe('POST Items:', () => {

    const event = Fixtures.event();
    let server;
    const user = Fixtures.user_id();
    let token;
    let eventID;

    before(async () => {

        await Promise.all([
            db.users.insert(user)
        ]);

        server = await Server;
    });

    after(async () => {

        await Promise.all([
            db.users.destroy({ id: user.id }),
            db.items.destroy({ id: eventID })//,
            // db.items.destroy({ name: event.name += 'a' })
        ]);
    });

    it('Create item', () => {

        token = JWT.sign({ id: user.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);

        const query = {
            method: 'POST',
            url: '/items',
            headers: { 'Authorization': token },
            payload: event
        };

        return (
            server.inject(query)
                .then((response) => {

                    eventID = response.result.data.id;
                    expect(response.statusCode).to.equal(200);
                })
        );
    });

    it('Create item duplicate', () => {

        const query2 = {
            method: 'POST',
            url: `/items`,
            headers: { 'Authorization': token },
            payload: event
        };

        return (
            server.inject(query2)
                .then((response) => {

                    expect(response.statusCode).to.equal(409);
                })
        );
    });

    it('Create Item: Not Event, With Dates', () => {

        event.name += 'a';
        event.type = 'place';
        const query = {
            method: 'POST',
            url: `/items`,
            headers: { 'Authorization': token },
            payload: event
        };

        return (
            server.inject(query)
                .then((response) => {

                    expect(response.statusCode).to.equal(400);
                })
        );
    });

    it('Create Item: Wrong Type', () => {

        event.type = 'carnival';
        event.startDate = null;
        event.endDate = null;

        const query = {
            method: 'POST',
            url: `/items`,
            headers: { 'Authorization': token },
            payload: event
        };

        return (
            server.inject(query)
                .then((response) => {

                    expect(response.statusCode).to.equal(400);
                })
        );
    });

    it('Create Item: No Name', () => {

        event.type = null;

        const query = {
            method: 'POST',
            url: `/items`,
            headers: { 'Authorization': token },
            payload: event
        };

        return (
            server.inject(query)
                .then((response) => {

                    expect(response.statusCode).to.equal(400);
                })
        );
    });
});
