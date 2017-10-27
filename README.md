# Hapitest

An api demo running on a local host that is able to query a database. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

```
PostgresSQL
With super user credentials
```
### Installing
create a new file in the config directory named local.json with the contents of development.json changing the username and password to that of your local postgres account
```sp
$npm i
```
3 enviroment enviroment variables need to be set PGDATABASE, PGPASSWORD, PGUSER to the vaulues in the local.json file. This can be done on windows using the command below.
```
$node -pe require('getconfig').db.connection.user > user &&node -pe require('getconfig').db.connection.password > password && node -pe require('getconfig').db.connection.database > database && set /p PGUSER= < user && set /p PGDATABASE= < database && set /p PGPASSWORD= < password && del user password database
```
```
$npm run makedb
$npm run migratedb
$npm start
```
### Reseting db
```sp
$npm run resetdb
```

Postman
* Post requests
- Add data via Body tab
- Set it to raw and JSON (application/json)
