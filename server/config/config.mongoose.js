const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/RPM_db')
    .then(() => {
        console.log("Successful connection to database 'RPM_db'"); 
    })
    .catch((error) => {
        console.log(`There was an error connecting to the database: ${error}`);
});