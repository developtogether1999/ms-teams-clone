const mongoose = require("mongoose");
const teamschema = new mongoose.Schema({
    name: {
        type: String
    },
    team: {
        type: String  
    }
});

module.exports = mongoose.model("Channel", teamschema);