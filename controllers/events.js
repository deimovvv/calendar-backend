const { response } = require('express')
const Evento = require('../models/Evento')

// OBTENER EVENTO GET
const getEvento = async(req, res = response) => {

  const eventos = await Evento.find().populate('user', 'name')
 

 return res.json({
    ok: true,
    eventos
  });
};

// CREAR EVENTO POST 
const crearEvento = async(req, res = response) => {


  const evento = new Evento(req.body)

  try{

    evento.user = req.uid 

    const eventoGuardado = await evento.save()
    res.json({
      ok: true,
      evento: eventoGuardado 
      
    })

  }catch(error){
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'hable con el administrador'
    })
  }
 
};

// ACTUALIZAR EVENTO PUT
const actualizarEvento = async(req, res = response) => {

  const eventoId = req.params.id;
  const uid = req.uid

  try{

    const evento = await Evento.findById( eventoId );

    if(!evento){
       return res.status(404).json({
        ok: false,
        msg: 'Evento no existe por ese ID '
      })
    }

    if( evento.user.toString() !== uid ){
      return res.status(401).json({
        ok: false,
        msg: 'no tiene privilegio de editar este evento'
      })
    }

    const nuevoEvento = {
      ...req.body,
      user: uid
    }

    const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, {new: true} );

    res.json({
      ok: true,
      evento: eventoActualizado
    })

  }catch(error){
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'hable con el administrador'
    })
  }

};

// ELIMINAR EVENTO DELETE
const eliminarEvento = async(req, res = response) => {


  
  const eventoId = req.params.id;
  const uid = req.uid

  try{

    const evento = await Evento.findById( eventoId );

    if(!evento){
      return res.status(404).json({
        ok: false,
        msg: 'Evento no existe por ese ID '
      })
    }

    if( evento.user.toString() !== uid ){
      return res.status(401).json({
        ok: false,
        msg: 'no tiene privilegio de eliminar este evento'
      })
    }


    await Evento.findByIdAndDelete( eventoId );

    res.json({
      ok: true,
    })

  }catch(error){
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'hable con el administrador'
    })
  }
}


module.exports = {
    getEvento,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}
