import http from 'node:http' // Note que o node:http é a forma recomendada a partir das versões mais recentes do Node.js, onde você pode usar o prefixo node: para identificar módulos internos.

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

const users = []

const server = http.createServer((req, res) => {
  const { method, url } = req

  if (method === 'GET' && url === '/users') {
    return res
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(users))
  }

  if (method === 'POST' && url ==='/users') {
    users.push({
      id: 1,
      name: 'Vitor Madalosso',
      email: 'vmadalosso@node.com'
    })

    return res.writeHead(201).end()
  }

  return res.writeHead(404).end()
})

server.listen(3333)