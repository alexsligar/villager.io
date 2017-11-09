SELECT 
users.name,
users.username,
users.email,
users.role,
users.bio
FROM 
users
WHERE   
users.username= ${username}
