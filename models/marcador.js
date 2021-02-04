const { Schema, model } = require('mongoose');

const MarcadorSchema = Schema({
    longitud:{
        type: String,
        require:true,
    },
    latitud:{
        type: String,
        require:true,
    },
    idMarcador:{
        type: String,
        require:true,
    },
    usuario:{
        type: String,
        require:true,
    },
    rol:{
        type: String,
        require:true,
    },
});

MarcadorSchema.method('toJSON', function(){

    const{__V,  ...object } = this.toObject();
    return object;
})

module.exports = model('Marcador', MarcadorSchema);