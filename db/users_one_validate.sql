SELECT
  users.id,
  users.name,
  users.email,
  users.username,
  users.role,
  users.logout
FROM
  users
WHERE
  users.username = ${username} AND
  users.id = ${id}