import mongoose from 'mongoose';

const ComentarioSchema = mongoose.Schema({

    coment: {
        type: String,
        required: [true, "el comentario es obligatorio"],
    },

})
export default mongoose.model('Comentario', ComentarioSchema);