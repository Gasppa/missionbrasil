const express = require('express')
const auth = require('../../middlewares/auth')
const router = express.Router()
const NoticiaDAO = require('../../models/Noticia')
const ENUMS = require('../../enums')

router.get('/', auth, async (req, res, next)=>{

  switch (req.role) {

    case ENUMS.ACCESS.OPERACAO:

      return res.status(401).send({
        error: 'Você não possui as permissões necessárias para executar essa ação.'
      });

    case ENUMS.ACCESS.ADMIN:

      try {
        const result = await NoticiaDAO.getNoticias()
        return res.status(200).send({
          noticias: result.rows
        })
      } catch (error) {
        return res.status(500).send({
          error: 'Alguém derrubou café no modem.'
        })
      }

    default:
      return res.status(401).send({
        error: 'Você precisa se autenticar para visualizar essa página'
      });
  }
})

module.exports = router