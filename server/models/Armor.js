const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    armor: { type: String },
    avater: { type: String },
    parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' },
    birth: { type: String },
    weapon: { type: String },
    skills: [{
        name: { type: String },
        icon: { type: String },
        description: { type: String },
        video: { type: String }
    }],
    pic: { type:String }

})

module.exports = mongoose.model('Armor', schema, 'armors')