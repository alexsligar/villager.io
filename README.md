# Villagers API

An API that currently runs on a local host that is intended to eventually run on a server. The aim is to create a community-building central hub that allows users to add Events, Places, Groups, and Activities within their community to Lists to share with friends, family, and the community at large. 

Eventual clients will interface with this API and devs will be welcome to make clients that make the most out of the Villagers API.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

```
PostgreSQL
With super user credentials
```

### Installing

Create a new file in the config directory named local.json with the contents of development.json. Change the username and password to that of your local postgres account.

```sp
$npm i
```
3 environment variables need to be set -- PGDATABASE, PGPASSWORD, PGUSER -- to the values in the local.json file. This can be done on Windows using the command below.
```
$node -pe require('getconfig').db.connection.user > user &&node -pe require('getconfig').db.connection.password > password && node -pe require('getconfig').db.connection.database > database && set /p PGUSER= < user && set /p PGDATABASE= < database && set /p PGPASSWORD= < password && del user password database
```
```
$npm run makedb
$npm run migratedb
$npm start
```
### Resetting db
```sp
$npm run resetdb
```

Postman
* Post requests
- Add data via Body tab
- Set it to raw and JSON (application/json)
