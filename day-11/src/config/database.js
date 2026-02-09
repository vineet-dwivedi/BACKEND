const mongo = require('mongoose');

function connectToDB(){
    mongo.connect(process.env.MONGO_URI).then(()=>{
        console.log('Connected To MONGO!!')
    })
}

module.exports = connectToDB;