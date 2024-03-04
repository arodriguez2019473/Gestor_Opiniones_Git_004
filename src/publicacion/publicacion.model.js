import mongoose from 'mongoose';

const publicacionSchema = mongoose.Schema({
 
    titulo: {
        type: String,
        required: [true, "El titulo es obligatorio"],
    },
    
    categoria: {
        type: String,
        required: [true, "la categoria es obligatoria"],
    },
    
    texto: {
        type: String,
        required: [true, "el texto es obligatorio"],
    },
        
    role: {
        type: String,
        required: true,
        enum: ["1"],
    },
    
    estado: {
        type: Boolean,
        default: true,
      }

    });

export default mongoose.model('Publicacion', publicacionSchema);