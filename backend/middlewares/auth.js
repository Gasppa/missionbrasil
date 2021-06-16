const express = require('express')
const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => { 
  const token = req.header('x-auth-token')

  if (!token) {
    return res.status(401).send({msg: 'Token não encontrado, autenticação negada'})
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'))

    req.role = decoded.role
    next()
  } catch (error) {
    res.status(401).json({msg: 'Token não é válido'})
  }
}
