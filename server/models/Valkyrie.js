const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    parent: [{
        type: mongoose.SchemaTypes.ObjectId, ref: 'Category'
    }],
    name: { type: String }
})

module.exports = mongoose.model('Valkyrie', schema, 'valkyries')