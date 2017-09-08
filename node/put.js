var request=require('request');

var idnum =process.argv[2];
var name = process.argv[3];
var breed = process.argv[4];
var age = process.argv[5];
var sex = process.argv[6];

   var json = {
     "name": name,
     "breed": breed,
     "age":age,
     "sex": sex

   };
console.log(json);
   var options = {
     url: 'http://127.0.0.1:3000/api/puppies/'+idnum,
     method: 'PUT',
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