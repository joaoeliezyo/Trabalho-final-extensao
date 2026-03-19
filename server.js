//  server.js

const express = require('express')
const path = require('path')
const session = require('express-session')
const app = express()
const port = process.env.PORT || 3000

// Middleware para analisar o corpo das solicitações
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Configurar sessão
app.use(
  session({
    secret: 'seu-secret-key-mude-em-producao',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24
    }
  })
)

// Configurando o Express para usar EJS como mecanismo de modelo
app.set('view engine', 'ejs')

// Middleware para servir arquivos estáticos
app.use(express.static('public'))
app.use('/css', express.static(path.join(__dirname, 'views', 'css')))
app.use('/imagens', express.static(path.join(__dirname, 'views', 'imagens')))

// Middleware para registrar as rotas
const indexRouter = require('./routes/index')
app.use('/', indexRouter)

// Middleware para lidar com erros
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Algo deu errado!')
})

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}/logo`)
})
