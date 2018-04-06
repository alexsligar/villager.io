'use strict';

const Fixtures = require('../fixtures');
const JWT = require('jsonwebtoken');
const Config = require('getconfig');
const Faker = require('faker');
const Server = Fixtures.server;
const db = Fixtures.db;

const { after, before, describe, it } = exports.lab = require('lab').script();
const { expect } = require('code');

describe('PUT Items:', () => {

    const event = Fixtures.event();
    const event2 = Fixtures.event();
    const place = Fixtures.place();
    const group = Fixtures.group();

    let server;

    const user = Fixtures.user_id();
    const mod = Fixtures.user_mod();

    let token;
    let newEvent;

    before(async () => {

        await Promise.all([
            db.users.insert(user),
            db.users.insert(mod)
        ]);

        newEvent = await Promise.all([
            db.items.insert(event),
            db.items.insert(event2),
            db.items.insert(place),
            db.items.insert(group)
        ]);

        await Promise.all([
            db.item_owners.insert({ username: user.username, item_id: newEvent[0].id })
        ]);

        server = await Server;
    });

    after(async () => {

        await Promise.all([
            db.users.destroy({ id: user.id }),
            db.users.destroy({ id: mod.id }),
            db.items.destroy({ id: newEvent[0].id }),
            db.items.destroy({ id: newEvent[1].id }),
            db.items.destroy({ id: newEvent[2].id }),
            db.items.destroy({ id: newEvent[3].id })
        ]);
    });

    it('Update item', () => {

        token = JWT.sign({ id: user.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);

        const query = {
            method: 'PUT',
            url: `/items/${newEvent[0].id}`,
            headers: { 'Authorization': token },
            payload: { 'name': 'THIS IS A TEST', 'linked_items': [newEvent[2].id] }
        };

        return (
            server.inject(query)
                .then((response) => {

                    expect(response.result.data.name).to.equal('THIS IS A TEST');
                    expect(response.statusCode).to.equal(200);
                })
        );
    });

    it('Update item: mod', () => {

        token = JWT.sign({ id: mod.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);

        place.name = 'THIS IS A TEST TOO';

        const query = {
            method: 'PUT',
            url: `/items/${newEvent[2].id}`,
            headers: { 'Authorization': token },
            payload: place
        };

        return (
            server.inject(query)
                .then((response) => {

                    expect(response.statusCode).to.equal(200);
                    expect(response.result.data.name).to.equal(place.name);
                })
        );
    });

    it('Update item: non-owner', () => {

        token = JWT.sign({ id: user.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);

        event.name = 'THIS IS A TEST';

        const query = {
            method: 'PUT',
            url: `/items/${newEvent[1].id}`,
            headers: { 'Authorization': token },
            payload: event
        };

        return (
            server.inject(query)
                .then((response) => {

                    expect(response.statusCode).to.equal(401);
                })
        );
    });

    it('Update item: Item does not exist', () => {

        token = JWT.sign({ id: mod.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);

        const notItem = newEvent[0].id + 100;

        event.name = 'TOO TEST TOO FURIOUS';

        const query = {
            method: 'PUT',
            url: `/items/${notItem}`,
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

    it('Update item: Individual item elements', () => {

        token = JWT.sign({ id: user.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);

        const query = {
            method: 'PUT',
            url: `/items/${newEvent[0].id}`,
            headers: { 'Authorization': token },
            payload: { 'name': 'TOO TEST TOO FURIOUS', 'start_date': '2014-02-01', 'end_date': '2014-02-02', 'location': 'here' }
        };

        return (
            server.inject(query)
                .then((response) => {

                    expect(response.statusCode).to.equal(200);
                    expect(response.result.data.location).to.equal('here');
                    expect(response.result.data.name).to.equal('TOO TEST TOO FURIOUS');
                })
        );
    });

    it('Update item: Non-Event with dates', () => {

        token = JWT.sign({ id: user.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);

        const query = {
            method: 'PUT',
            url: `/items/${newEvent[0].id}`,
            headers: { 'Authorization': token },
            payload: { 'type': 'place' }
        };

        return (
            server.inject(query)
                .then((response) => {

                    expect(response.statusCode).to.equal(400);
                })
        );
    });

    it('Update item: Event without dates', () => {

        token = JWT.sign({ id: mod.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);

        /* newEvent[2] was a 'place'*/
        const query = {
            method: 'PUT',
            url: `/items/${newEvent[2].id}`,
            headers: { 'Authorization': token },
            payload: { 'type': 'event' }
        };

        return (
            server.inject(query)
                .then((response) => {

                    expect(response.statusCode).to.equal(400);
                })
        );
    });

    it('Update item: Add Linked Item', () => {

        token = JWT.sign({ id: user.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);

        const query = {
            method: 'PUT',
            url: `/items/${newEvent[0].id}`,
            headers: { 'Authorization': token },
            payload: { 'linked_items': [1] }
        };

        return (
            server.inject(query)
                .then((response) => {

                    expect(response.statusCode).to.equal(200);
                })
        );
    });

    it('Update item: Add Non-Item Link', () => {

        token = JWT.sign({ id: user.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);

        const query = {
            method: 'PUT',
            url: `/items/${newEvent[0].id}`,
            headers: { 'Authorization': token },
            payload: { 'linked_items': [(newEvent[0].id + 100)] }
        };

        return (
            server.inject(query)
                .then((response) => {

                    expect(response.statusCode).to.equal(404);
                })
        );
    });

    it('Update item: Add place link to place', () => {

        token = JWT.sign({ id: mod.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);

        const query = {
            method: 'PUT',
            url: `/items/${newEvent[2].id}`,
            headers: { 'Authorization': token },
            payload: { 'linked_items': [newEvent[2].id] }
        };

        return (
            server.inject(query)
                .then((response) => {

                    expect(response.statusCode).to.equal(400);
                })
        );
    });

    it('Update item: Add group link to place', () => {

        token = JWT.sign({ id: mod.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);

        const query = {
            method: 'PUT',
            url: `/items/${newEvent[2].id}`,
            headers: { 'Authorization': token },
            payload: { 'linked_items': [4] }
        };

        return (
            server.inject(query)
                .then((response) => {

                    //console.log(response);
                    expect(response.statusCode).to.equal(400);
                })
        );
    });

    it('Update item: Add group link to activity', () => {

        token = JWT.sign({ id: mod.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);

        const query = {
            method: 'PUT',
            url: `/items/${newEvent[2].id}`,
            headers: { 'Authorization': token },
            payload: { 'type': 'activity', 'linked_items': [4] }
        };

        return (
            server.inject(query)
                .then((response) => {

                    expect(response.statusCode).to.equal(400);
                })
        );
    });

    it('Update item: Add group link to group', () => {

        token = JWT.sign({ id: mod.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);

        const query = {
            method: 'PUT',
            url: `/items/${newEvent[2].id}`,
            headers: { 'Authorization': token },
            payload: { 'type': 'group', 'linked_items': [4] }
        };

        return (
            server.inject(query)
                .then((response) => {

                    expect(response.statusCode).to.equal(400);
                })
        );
    });

    it('Update item: Add place link to group', () => {

        token = JWT.sign({ id: mod.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);

        const query = {
            method: 'PUT',
            url: `/items/${newEvent[3].id}`,
            headers: { 'Authorization': token },
            payload: { 'linked_items': [1] }
        };

        return (
            server.inject(query)
                .then((response) => {

                    expect(response.statusCode).to.equal(200);
                })
        );
    });

    it('Update item: Add event link to event', () => {

        token = JWT.sign({ id: user.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);

        const query = {
            method: 'PUT',
            url: `/items/${newEvent[0].id}`,
            headers: { 'Authorization': token },
            payload: { 'linked_items': [newEvent[1].id] }
        };

        return (
            server.inject(query)
                .then((response) => {

                    expect(response.statusCode).to.equal(400);
                })
        );
    });

    it('Update item: No place linked to event', () => {

        token = JWT.sign({ id: user.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);

        const query = {
            method: 'PUT',
            url: `/items/${newEvent[0].id}`,
            headers: { 'Authorization': token },
            payload: { 'linked_items': [4] }
        };

        return (
            server.inject(query)
                .then((response) => {

                    expect(response.statusCode).to.equal(400);
                })
        );
    });

    it('Up item: Add Tag', () => {

        token = JWT.sign({ id: mod.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);

        const query = {
            method: 'PUT',
            url: `/items/${newEvent[2].id}`,
            headers: { 'Authorization': token },
            payload: { 'tags': ['outdoors'] }
        };

        return (
            server.inject(query)
                .then((response) => {

                    expect(response.statusCode).to.equal(200);
                })
        );
    });

    it('Up item: Add Non-Tag', () => {

        token = JWT.sign({ id: mod.id, timestamp: new Date() }, Config.auth.secret, Config.auth.options);

        const nonTag = Faker.lorem.word();

        const query = {
            method: 'PUT',
            url: `/items/${newEvent[2].id}`,
            headers: { 'Authorization': token },
            payload: { 'type': 'activity', 'linked_items': [1], 'tags': [nonTag] }
        };

        return (
            server.inject(query)
                .then((response) => {

                    expect(response.statusCode).to.equal(400);
                })
        );
    });
});
