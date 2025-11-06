const API_BASE_URL = '/api'

/**
 * Busca agendamentos cirúrgicos com paginação e filtros
 * @param {Object} params - Parâmetros de busca
 * @param {number} params.paginaAtual - Número da página atual
 * @param {number} params.itensPorPagina - Quantidade de itens por página
 * @param {string} params.dataCriacao - Filtro por data de criação (ISO 8601)
 * @param {string} params.busca - Busca por médico ou paciente
 * @param {string} params.ordenacao - Ordenação: 'ASC' ou 'DESC' (padrão: 'DESC')
 * @returns {Promise<Object>} Resposta da API com dados e paginação
 */
export async function buscarAgendamentos(params = {}) {
  const {
    paginaAtual = 1,
    itensPorPagina = 10,
    dataCriacao = null,
    busca = null,
    ordenacao = 'DESC'
  } = params

  const queryParams = new URLSearchParams({
    paginaAtual: paginaAtual.toString(),
    itensPorPagina: itensPorPagina.toString(),
    ordenacao: ordenacao.toUpperCase()
  })

  if (dataCriacao) {
    queryParams.append('dataCriacao', dataCriacao)
  }

  if (busca && busca.trim()) {
    queryParams.append('busca', busca.trim())
  }

  const response = await fetch(`${API_BASE_URL}/agendamentos?${queryParams.toString()}`)

  if (!response.ok) {
    throw new Error(`Erro ao buscar agendamentos: ${response.statusText}`)
  }

  return response.json()
}
