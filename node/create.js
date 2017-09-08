var request=require('request');

var name = process.argv[2];
var breed = process.argv[3];
var age = process.argv[4];
var sex = process.argv[5];

   var json = {
     "name": name,
     "breed": breed,
     "age":age,
     "sex": sex

   };

   var options = {
     url: 'http://127.0.0.1:3000/api/puppies',
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     json: json
   };

   request(options, function(err, res, body) {
     if (res && (res.statusCode === 200 || res.statusCode === 201)) {
       console.log(body);
     }
   });