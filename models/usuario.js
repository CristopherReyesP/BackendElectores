const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

    nombre:{
        type: String,
        require:true,
        unique:true
    },
    password:{
        type: String,
        require:true,
    },
    email:{
        type: String,
        require:true,
        unique:true
    },
    online:{
        type: Boolean,
        default: false
    },
    rol:{
        type: String,
        require:true
    },
    vinculo:{
        type: String,
        require:true 
    }

}); 

UsuarioSchema.method('toJSON', function(){

    const{__V, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model(' Usuario', UsuarioSchema);