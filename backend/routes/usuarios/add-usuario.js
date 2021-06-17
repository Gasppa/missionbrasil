const express = require('express')
const auth = require('../../middlewares/auth')
const router = express.Router()
const UsuarioDAO = require('../../models/Usuario')

router.post('/', auth, async (req, res, next)=>{

  try {
    await UsuarioDAO.save(req.body.user)
    return res.status(200).send({
      msg: 'O usuário foi salvo com sucesso.'
    })
  } catch (error) {
    return res.status(500).send({
      error: 'Alguém derrubou café no modem.'
    })
  }

})

module.exports = router