SELECT
  users.id,
  users.name,
  users.email,
  users.username
FROM
  users
WHERE
  users.username = ${username} AND
  users.password = ${password}