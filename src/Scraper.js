const axios = require('axios');

axios.get('https://thebook.io/080212')
    .then(data => {
        console.log(data);
    });