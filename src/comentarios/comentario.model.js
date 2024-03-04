import mongoose from 'mongoose';

const ComentarioSchema = mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    coment: {
        type: String,
        required: [true, "el comentario es obligatorio"],
    }
});

export default mongoose.model('Comentario', ComentarioSchema);
