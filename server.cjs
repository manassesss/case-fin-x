const jsonServer = require('json-server')
const fs = require('fs')
const path = require('path')
const server = jsonServer.create()
const dbPath = path.join(__dirname, 'db.json')
const router = jsonServer.router(dbPath)
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

// Função para carregar dados do JSON
function loadAgendamentos() {
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'))
  return db.agendamentos || []
}

// Middleware customizado para formatar a resposta conforme especificação
server.get('/api/agendamentos', (req, res) => {
  const query = req.query
  const paginaAtual = parseInt(query.paginaAtual) || 1
  const itensPorPagina = parseInt(query.itensPorPagina) || 10
  const dataCriacao = query.dataCriacao
  const busca = query.busca // Busca por médico ou paciente
  const ordenacao = query.ordenacao || 'DESC' // ASC ou DESC, padrão DESC (mais recente primeiro)

  // Buscar todos os agendamentos
  let agendamentos = loadAgendamentos()

  // Filtrar por busca (médico ou paciente) se fornecido
  if (busca && busca.trim()) {
    const searchTerm = busca.toLowerCase().trim()
    agendamentos = agendamentos.filter(item => {
      const nomeMedico = item.medico?.nome?.toLowerCase() || ''
      const nomePaciente = item.paciente?.nome?.toLowerCase() || ''
      return nomeMedico.includes(searchTerm) || nomePaciente.includes(searchTerm)
    })
  }

  // Filtrar por data se fornecido
  if (dataCriacao) {
    const filterDate = new Date(dataCriacao).toISOString().split('T')[0]
    agendamentos = agendamentos.filter(item => {
      const itemDate = new Date(item.dataCriacao).toISOString().split('T')[0]
      return itemDate === filterDate
    })
  }

  // Ordenar por data de criação
  agendamentos.sort((a, b) => {
    const dataA = new Date(a.dataCriacao).getTime()
    const dataB = new Date(b.dataCriacao).getTime()
    return ordenacao.toUpperCase() === 'ASC' ? dataA - dataB : dataB - dataA
  })

  // Calcular paginação
  const totalDeItens = agendamentos.length
  const totalDePaginas = Math.ceil(totalDeItens / itensPorPagina)
  const startIndex = (paginaAtual - 1) * itensPorPagina
  const endIndex = startIndex + itensPorPagina
  const paginatedData = agendamentos.slice(startIndex, endIndex)

  // Construir URLs de paginação
  const baseUrl = '/api/agendamentos'
  const nextParams = new URLSearchParams()
  if (paginaAtual < totalDePaginas) {
    nextParams.set('paginaAtual', paginaAtual + 1)
    nextParams.set('itensPorPagina', itensPorPagina)
    if (busca) nextParams.set('busca', busca)
    if (dataCriacao) nextParams.set('dataCriacao', dataCriacao)
    nextParams.set('ordenacao', ordenacao)
  }
  const nextPageUrl = paginaAtual < totalDePaginas ? `${baseUrl}?${nextParams.toString()}` : null

  const prevParams = new URLSearchParams()
  if (paginaAtual > 1) {
    prevParams.set('paginaAtual', paginaAtual - 1)
    prevParams.set('itensPorPagina', itensPorPagina)
    if (busca) prevParams.set('busca', busca)
    if (dataCriacao) prevParams.set('dataCriacao', dataCriacao)
    prevParams.set('ordenacao', ordenacao)
  }
  const prevPageUrl = paginaAtual > 1 ? `${baseUrl}?${prevParams.toString()}` : null

  const formattedResponse = {
    data: paginatedData,
    paginacao: {
      paginaAtual,
      itensPorPagina,
      totalDePaginas,
      totalDeItens,
      next_page_url: nextPageUrl,
      prev_page_url: prevPageUrl
    }
  }

  res.json(formattedResponse)
})

// Outras rotas do json-server (manter depois da rota customizada)
server.use('/api', router)

const PORT = 3001
server.listen(PORT, () => {
  console.log(`JSON Server está rodando em http://localhost:${PORT}`)
  console.log(`Endpoint: http://localhost:${PORT}/api/agendamentos`)
  console.log(`\nExemplos de uso:`)
  console.log(`  GET http://localhost:${PORT}/api/agendamentos`)
  console.log(`  GET http://localhost:${PORT}/api/agendamentos?paginaAtual=1&itensPorPagina=3`)
  console.log(`  GET http://localhost:${PORT}/api/agendamentos?dataCriacao=2024-09-20T12:00:00Z`)
  console.log(
    `  GET http://localhost:${PORT}/api/agendamentos?paginaAtual=1&itensPorPagina=3&dataCriacao=2024-09-20T12:00:00Z`
  )
})
