const { Schema, model } = require('mongoose');

const VotanteSchema = Schema({
    nombre:{
        type: String,
        require:true,
    },
    domicilio:{
        type: String,
        require:true,
    },
    sexo:{
        type: String,
        require:true,
    },
    fechaNacimiento:{
        type: String,
        require:true,
    },
    claveElector:{
        type: String,
        require:true,
    },
    Registro:{
        type: String,
        require:true,
    },
    curp:{
        type: String,
        require:true,
    },
    estado:{
        type: String,
        require:true,
    },
    localidad:{
        type: String,
        require:true,
    },
    municipio:{
        type: String,
        require:true,
    },
    seccion:{
        type: String,
        require:true,
    },
    emision:{
        type: String,
        require:true,
    },
    vigencia:{
        type: String,
        require:true,
    },
    digitador:{
        type: String,
        require:true,
    },
    candidato:{
        type: String,
        require:true,
    },
    preguntaUno:{
        type: String,
        require:true,
    },
    preguntaDos:{
        type: String,
        require:true,
    },
    preguntaTres:{
        type: String,
        require:true,
    },
    voto:{
        type: String,
        require:true,
    }
},{
    timestamps: true
});

VotanteSchema.method('toJSON', function(){

    const{__V,  ...object } = this.toObject();
    return object;
})

module.exports = model('Votante', VotanteSchema);