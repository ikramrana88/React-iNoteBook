const mongoose = require('mongoose');
const mogoURI = "mongodb://localhost:27017/?directConnection=true&readPreference=primary";

const connectToMongo = ()=>{
    mongoose.connect(mogoURI, ()=>{
        console.log("connected to mmongodb")
    })
}

module.exports = connectToMongo;