[![](http://upload.wikimedia.org/wikipedia/commons/1/14/Jane_Jacobs.jpg)](http://en.wikipedia.org/wiki/Jane_Jacobs)

> __“Cities have the capability of providing something for everybody, only because, and only when, they are created by everybody.”__
> — Jane Jacobs

villager (work in progress)
===========================
__Forget massive corporate social networks. Let's build villages.__

The project takes its name from [Jane Jacobs](http://en.wikipedia.org/wiki/Jane_Jacobs) (above) and her work on the [urban village](http://en.wikipedia.org/wiki/Urban_village). The underlying thesis of this project is that our online connectedness can be a tool to help overcome the tragic disconnectedness of suburbia.

---

## The problem

Right now, good things in our local community have a real discoverability problem. I have lived here my entire life and I'm still finding out new and interesting people and places, and finding new things to do and stuff to get involved in.

And that's *me* saying that. Most people know me as a reasonably well-connected person—someone new to the area doesn't even stand a chance.

But most information regarding "things to do", "places to go", "ways to contribute", "interesting things happening" is ferreted away in a thousand places.

And, no, corporate social networks aren't good enough. Facebook is now the default place for most of this stuff, but it only helps provide useful information as an unintentional bug on its main feature: endless distractibility. If you're actually *looking* for something to do or somewhere to get involved, tough luck.

And the result is this complete contrast between reality and people's experience—folks whining there's nothing to do while there are tons of interesting things going on.

We can do better.

## The solution

An open API and a simple website.

No, seriously. I actually believe software can be useful to people, and I believe that, in this case, software could be part of solving a real problem of disconnectedness in our suburban community.

## Here's the vision

People will be able to add and keep up to date things like:

- Places (restaurants, parks)
- Groups (non-profits, organizations, teams, clubs)
- Events (music shows, theatre, meetups, political rallies, workshops)
- Activities ("things to do" like "climb Badger Mountain", "swim across the river", or "go roller skating")

We'll allow anyone to submit new things, but they'll all be moderated by an ever-growing group of people who want to garden the quality of the site.

Users will be able to star their favorites and make and share lists of them as a way of organizing their recommendations.

Groups and places will have their own pages that will allow them to show upcoming events.

## Why an open API?

There are a number of sites out there already aiming to do this kind of thing, and they're all completely centralized and controlled by one person or at least a *very small* number of people. And most of them have extremely cluttered interfaces.

We need a resource that is contributed to and maintained by the entire community. Building an API ensures that everyone can contribute to the same data, but if they want to embed the same information on their own site, they can do so, without having to maintain their own copy of the data.

Allowing people to build on and embed this information in their own sites will increase the likelihood that we'll actually have something close to a thorough resource.

## So what's the current status?

Version 1.0 of Villager has the base functionality to get this project started, but it still has some room to grow before it's the API that we've envisioned. You can take a look at the Swagger documentation for a detailed list of all the functionality available, but at a glance, here are some of the current highlights:

### Items (Events, Activities, Places, and Groups):
- Adding and deleting items from the database
- Linking items to other items (such as an Event being run by a Group)
- Tagging items with a category ('outdoors', 'kid-friendly', etc.)

### Lists:
- Adding and deleting of lists
- Adding and deleting Items from lists

### Moderation functions:
- Ability to edit items, regardless of owner/creator
- Ability to merge virtually identical items (maintaining all owners/tags/links of the originals)
- Ability to assign users permissions on items

### In addition to this functionality, future additions could include:
- Following of Users and Lists (Get a notification when a List you like has been updated)
- Event calendars with filters for specific tags/locations/days, etc.
- Search functionality
- Flagging items for Moderator attention
- The sky's the limit!

## Contributors welcome!

If you're interested in contributing to this effort, your involvement would be enthusiastically welcomed. <a href="mailto:adam@welp.email">Ping me</a> and I'll buy you lunch or coffee and we can talk about it.

----
## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

```
PostgreSQL version 9.6
```
### Enviroment Variables

3 environment variables need to be set to the values in the local.json file. 
```
PGDATABASE
PGPASSWORD
PGUSER
```
This can be done on Windows using the command below.
```
$node -pe require('getconfig').db.connection.user > user &&node -pe require('getconfig').db.connection.password > password && node -pe require('getconfig').db.connection.database > database && set /p PGUSER= < user && set /p PGDATABASE= < database && set /p PGPASSWORD= < password && del user password database
```

### Running the code

Want to contribute? Here's what you need to do to run the API locally.


1. ``npm i`` to install dependencies

2. ``npm run makedb`` to set up db

3. ``npm run migratedb`` to create tables

4. ``npm start`` to run


### Testing

For testing, we depend on 3 separate libaries in order to perform proper testing

1. ``lab`` is the main driver for executing the API tests

2. ``code`` is the assertion library utilized by lab

3. ``faker`` enables the capabilities to provide the tests mock data

We have two scripts for testing

1. ``npm run testcoverage`` will conduct the full checks (Linting, Coverage, Unit Tests).

2. ``npm run test`` will be the customizable script developers will use to run unit tests.

To customize the *test* script, go into `package.json` and in the *scripts* object, modify the *test* line

```
"test": "lab test -a code -L -v -c -e test"
```

Should the developer want to test in a specific folder, change the script to include the folder name

```
"test": "lab test/[folder name] -a code -L -v -c -e test"
```

For more documentation, please see <a href="https://github.com/hapijs/lab">Lab</a> github page for more details.

The structure of our tests is simple; All tests are in the *test* directory and the *test* directory should reflect the *controller* directory (1-1 file for testing) with the exception of the `fixtures.js` file in *test*.

The `fixtures.js` contains all the pertinent mock data used by each unit tests. This is where the `faker` library is utilized.  Every tests will depend on receiving mock data from the `fixtures.js`.
