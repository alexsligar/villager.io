SELECT 
users.id
users.username
users.password
users.role
FROM 
users
WHERE   
users.username= ${username}
