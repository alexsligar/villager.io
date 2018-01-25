SELECT
  users.id,
  users.name,
  users.email,
  users.username,
  users.role,
  users.bio,
  users.logout
FROM
  users
WHERE
  users.username = ${username} AND
  users.password = ${password}