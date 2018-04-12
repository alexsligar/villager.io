'use strict';

const Fixtures = require('../fixtures');
const Server = Fixtures.server;
const db = Fixtures.db;

const { after, before, describe, it } = exports.lab = require('lab').script();
const { expect } = require('code');

describe('LIST tags:', () => {

    let server;

    const tag = Fixtures.tag();

    before(async () => {

        server = await Server;

        await Promise.all([
            db.tags.insert(tag)
        ]);
    });

    after(async () => {

        await Promise.all([
            db.tags.destroy(tag.name)
        ]);
    });

    it('List tags', () => {

        const query = {
            method: 'GET',
            url:    `/tags`
        };
        return (
            server.inject(query)
                .then((response) => {

                    expect(response.statusCode).to.equal(200);
                })
        );
    });
});
