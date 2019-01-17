SELECT
  users.password
FROM
  users
WHERE
  users.username = ${username}
OR
  users.email = ${username}