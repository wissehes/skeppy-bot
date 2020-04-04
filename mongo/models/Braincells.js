const mongoose = require('mongoose');

const braincellSchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    userId: String,
    braincells: Number
});

module.exports = mongoose.model('Braincell', braincellSchema);