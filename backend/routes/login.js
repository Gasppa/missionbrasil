const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const config = require('config')
const UsuarioDAO = require('../models/Usuario')

function createPayload(user) {
    return {
      user: user.username,
      role: user.role
    }
}

router.post('/', async (req, res) => {
  if(req.header('apikey') !== config.get('apikey')) {
    return res.status(401).send({
      msg: "ApiKey Inválida"
    })
  }

  const result = await UsuarioDAO.getUser(req.body.user)

  if(result.rowCount > 0) {
    const user = result.rows[0]
    const payload = createPayload(user)

    jwt.sign(
      payload, 
      config.get('jwtSecret'), 
      {expiresIn: 360000},
      (err, token) => {
        if(err) throw err
        return res.json({ token })
      }
    )
  } else { 
    return res.status(401).send({
      msg: "Credenciais de login inválidas."
    })
  }
  
})

module.exports = router