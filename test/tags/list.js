'use strict';

const Fixtures = require('../fixtures');
const Server = Fixtures.server;

const { after, before, describe, it } = exports.lab = require('lab').script();
const { expect } = require('code');

describe('POST Lists:', () => {

    let server;

    before(async () => {

        server = await Server;

        await Promise.all([
        ]);
    });

    after(async () => {

        await Promise.all([
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
