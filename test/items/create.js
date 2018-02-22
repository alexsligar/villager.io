'use strict';

const Fixtures = require('../fixtures');
const Server = Fixtures.server;
const db = Fixtures.db;

const { after, before, describe, it } = exports.lab = require('lab').script();
const { expect } = require('code');


describe('POST /items', () => {

    let server;
    const event = Fixtures.event();
    let newEvent;

    before(async () => {

        server = await Server;

        newEvent = await Promise.all([
            db.items.insert(event)
        ]);
    });

    after(async () => {

        await Promise.all([
            db.items.destroy({ id: newEvent[0].id })
        ]);
    });

    it('Create items', async () => {

        const query = {
            method: 'GET',
            url:    `/items`
        };

        const response = await server.inject(query);

        expect(response.statusCode).to.equal(200);
    });
});
