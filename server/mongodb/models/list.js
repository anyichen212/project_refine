import mongoose from 'mongoose';

const ListSchema = new mongoose.Schema({
    title : {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
})

const listModel = mongoose.model('List', ListSchema);

export default listModel;