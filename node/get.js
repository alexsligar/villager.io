const request = require('request');

const options = {  
    url: 'http://127.0.0.1:3000/api/puppies',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};

request(options, function(err, res, body) {  
    let json = JSON.parse(body);
    console.log(json);
});