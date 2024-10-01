import http from 'node:http' // Note que o node:http é a forma recomendada a partir das versões mais recentes do Node.js, onde você pode usar o prefixo node: para identificar módulos internos.
import { Database } from './database.js'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'

// HTTP
// - Method HTTP
// - URL

// GET => Buscar um recurso do back-end
// POST => Criar um recurso no back-end
// PUT => Atualizar um recurso no back-end
// PATCH => Atualizar uma informação específica no back-end
// DELETE => Deletar um recurso do back-end

// Stateful - Stateless

// Cabeçalhos (Requisição/Resposta) => Metadados

// HTTP Status Code

// Query Parameters: URL Stateful => Filtros, paginação, não-obrigatórios
// Route Parameters: Identificação de recurso
// Request Body: Envio de informações de um formulário (HTTPs)

const database = new Database()

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if (route) {
      const routeParams = req.url.match(route.path)

      const { query, ...params } = routeParams.groups

      req.params = params
      req.query = query ? extractQueryParams(query) : {}

    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(3333)