# Hapitest

The first api demo running on a local host that is able to query a database. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

```
PostgresSQL
```
```
A database named testdb 
```
I have not figured out how to create a new database other than using the console, so for now this is the fix
### Installing

```sp
$npm i
$knex migrate:latest
$knex seed:run
$npm start
```

