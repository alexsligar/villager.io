SELECT 
users.name,
users.username,
users.email,
users.role
FROM 
users
WHERE   
users.username= ${username}
