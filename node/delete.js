var request=require('request');

var idnum = process.argv[2];
   

   var options = {
     url: 'http://127.0.0.1:3000/api/puppies/'+idnum,
     method: 'DELETE',
     headers: {
       'Content-Type': 'application/json'
     },
     
   };

   request(options, function(err, res, body) {
     if (res && (res.statusCode === 200 || res.statusCode === 201)) {
       console.log(body);
     }
   });