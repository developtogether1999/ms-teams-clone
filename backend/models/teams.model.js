const mongoose = require("mongoose");
const teamschema = new mongoose.Schema({
    owner: {
        type: String
    },
    code: {
        type: String
    },
    name: {
        type: String
    },
    participants: {
        type: [ String ] 
    }
});

module.exports = mongoose.model("Team", teamschema);