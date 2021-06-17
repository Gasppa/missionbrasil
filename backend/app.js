const express = require('express')
const app = express()
const cors = require('cors')

const PORT = process.env.PORT || 3010

const corsOptions = {
  origin: '*',
  optionSuccessStatus: 200
}

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors(corsOptions))

app.use('/api/login', require('./routes/login'));
app.use('/api/add-usuario', require('./routes/usuarios/add-usuario'));
app.use('/api/add-noticia', require('./routes/noticias/add-noticia'));
app.use('/api/get-noticias', require('./routes/noticias/get-noticias'));

app.listen(PORT, () => {
  console.log('server on')
})