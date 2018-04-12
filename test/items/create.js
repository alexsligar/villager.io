'use strict';

const Fixtures = require('../fixtures');
const JWT = require('jsonwebtoken');
const Config = require('getconfig');
const Faker = require('faker');
const Server = Fixtures.server;
const db = Fixtures.db;

const { after, before, describe, it } = exports.lab = require('lab').script();
const { expect } = require('code');

describe('POST Items:', () => {

    const event = Fixtures.event();
    let place = Fixtures.place();
    const group = Fixtures.group();

    let server;

    const user = Fixtures.user_id();

    const tag = Fixtures.tag();

    let token;
    let eventID;
    let placeID;
    let groupID;
    let activityID;

    before(async () => {

        await Promise.all([
            db.users.insert(user),
            db.tags.insert(tag)
        ]);

        server = await Server;
    });

    after(async () => {

        await Promise.all([
            db.users.destroy({ id: user.id }),
            db.items.destroy({ id: eventID }),
            db.items.destroy({ id: placeID }),
            db.items.destroy({ id: groupID }),
            db.items.destroy({ id: activityID }),
            db.tags.destroy({ name: tag.name })
        ]);
    });

    it('Create item, Correct', () => {

        token = JWT.sign({ id: user.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);

        event.tags = [tag.name];

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

        event.name = Faker.lorem.word();
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

    it('Create Item: Event, No Start Date', () => {

        place.type = 'event';

        const query = {
            method: 'POST',
            url: `/items`,
            headers: { 'Authorization': token },
            payload: place
        };

        return (
            server.inject(query)
                .then((response) => {

                    expect(response.statusCode).to.equal(400);
                })
        );
    });

    it('Create Item: Non-Event, End-Date', () => {

        group.end_date = '01/01/2015';

        const query = {
            method: 'POST',
            url: `/items`,
            headers: { 'Authorization': token },
            payload: group
        };

        return (
            server.inject(query)
                .then((response) => {

                    expect(response.statusCode).to.equal(400);
                })
        );
    });

    it('Create Item: Wrong Type', () => {

        place.type = 'carnival';

        const query = {
            method: 'POST',
            url: `/items`,
            headers: { 'Authorization': token },
            payload: place
        };

        return (
            server.inject(query)
                .then((response) => {

                    expect(response.statusCode).to.equal(400);
                })
        );
    });

    it('Create Item: No Name', () => {

        place.name = '';
        place.type = 'place';

        const query = {
            method: 'POST',
            url: `/items`,
            headers: { 'Authorization': token },
            payload: place
        };

        return (
            server.inject(query)
                .then((response) => {

                    expect(response.statusCode).to.equal(400);
                })
        );
    });

    it('Create Place: Linked Items', () => {

        place = Faker.lorem.word();
        place = Fixtures.place();
        place.linked_items = [eventID];

        const query = {
            method: 'POST',
            url: `/items`,
            headers: { 'Authorization': token },
            payload: place
        };

        return (
            server.inject(query)
                .then((response) => {

                    expect(response.statusCode).to.equal(400);
                })
        );
    });

    it('Link Non-existent Item', () => {

        event.type = 'event';
        event.linked_items = [eventID + 100];

        const query = {
            method: 'POST',
            url: `/items`,
            headers: { 'Authorization': token },
            payload: event
        };

        return (
            server.inject(query)
                .then((response) => {

                    expect(response.statusCode).to.equal(404);
                })
        );
    });

    it('Link Event to Event', () => {

        event.name = Faker.lorem.word();
        event.type = 'event';
        event.linked_items = [9];

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

    it('Link Group to Place', () => {

        place.name = Faker.lorem.word();
        place.type = 'group';
        delete place.linked_items;
        place.linked_items = [1];

        const query = {
            method: 'POST',
            url: `/items`,
            headers: { 'Authorization': token },
            payload: place
        };

        return (
            server.inject(query)
                .then((response) => {

                    groupID = response.result.data.id;
                    expect(response.statusCode).to.equal(200);
                })
        );
    });

    it('Link Group to not Place', () => {

        place.name = Faker.lorem.word();
        place.type = 'group';
        delete place.linked_items;
        place.linked_items = [4];

        const query = {
            method: 'POST',
            url: `/items`,
            headers: { 'Authorization': token },
            payload: place
        };

        return (
            server.inject(query)
                .then((response) => {

                    expect(response.statusCode).to.equal(400);
                })
        );
    });

    it('Link Activity to Place', () => {

        place.name = Faker.lorem.word() + 'a';
        place.type = 'activity';
        delete place.linked_items;
        place.linked_items = [1];

        const query = {
            method: 'POST',
            url: `/items`,
            headers: { 'Authorization': token },
            payload: place
        };

        return (
            server.inject(query)
                .then((response) => {

                    activityID = response.result.data.id;
                    expect(response.statusCode).to.equal(200);
                })
        );
    });

    it('Link Activity to not Place', () => {

        place.name = Faker.lorem.word();
        place.type = 'activity';
        delete place.linked_items;
        place.linked_items = [4];

        const query = {
            method: 'POST',
            url: `/items`,
            headers: { 'Authorization': token },
            payload: place
        };

        return (
            server.inject(query)
                .then((response) => {

                    expect(response.statusCode).to.equal(400);
                })
        );
    });

    it('Incorrect Tags', () => {

        const falseTag = Faker.lorem.word();

        delete place.linked_items;
        place.name = Faker.lorem.word();
        place.tags = [falseTag];

        const query = {
            method: 'POST',
            url: `/items`,
            headers: { 'Authorization': token },
            payload: place
        };

        return (
            server.inject(query)
                .then((response) => {

                    expect(response.statusCode).to.equal(400);
                })
        );
    });

    it('Place without links', () => {

        delete place.linked_items;
        place.name = Faker.lorem.word();
        delete place.tags;
        place.type = 'place';

        const query = {
            method: 'POST',
            url: `/items`,
            headers: { 'Authorization': token },
            payload: place
        };

        return (
            server.inject(query)
                .then((response) => {

                    placeID = response.result.data.id;
                    expect(response.statusCode).to.equal(200);
                })
        );
    });

    it('Place without links', () => {

        delete event.linked_items;
        event.name = Faker.lorem.word();
        event.linked_items = [4];

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
