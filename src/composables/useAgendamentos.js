import { ref, computed } from 'vue'
import { buscarAgendamentos } from '../services/api.js'

export function useAgendamentos() {
  const agendamentos = ref([])
  const paginacao = ref({
    paginaAtual: 1,
    itensPorPagina: 10,
    totalDePaginas: 0,
    totalDeItens: 0,
    next_page_url: null,
    prev_page_url: null
  })
  const ordenacao = ref('DESC') // 'ASC' ou 'DESC'
  const busca = ref('') // Termo de busca por médico ou paciente
  const loading = ref(false)
  const error = ref(null)

  const carregarAgendamentos = async (params = {}) => {
    loading.value = true
    error.value = null

    // Delay mínimo para melhorar a experiência visual (1.2 segundos)
    const minLoadingTime = 1200
    const startTime = Date.now()

    try {
      // Se a ordenação ou busca foi alterada, volta para a primeira página
      if (
        (params.ordenacao && params.ordenacao !== ordenacao.value) ||
        (params.busca !== undefined && params.busca !== busca.value)
      ) {
        params.paginaAtual = 1
      }

      const ordenacaoAtual = params.ordenacao || ordenacao.value
      const buscaAtual = params.busca !== undefined ? params.busca : busca.value

      const response = await buscarAgendamentos({
        paginaAtual: params.paginaAtual || paginacao.value.paginaAtual,
        itensPorPagina: params.itensPorPagina || paginacao.value.itensPorPagina,
        dataCriacao: params.dataCriacao || null,
        busca: buscaAtual || null,
        ordenacao: ordenacaoAtual
      })

      agendamentos.value = response.data || []
      paginacao.value = response.paginacao || paginacao.value
      ordenacao.value = ordenacaoAtual
      busca.value = buscaAtual
    } catch (err) {
      error.value = err.message || 'Erro ao carregar agendamentos'
      console.error('Erro ao carregar agendamentos:', err)
    } finally {
      // Garantir que o loading seja exibido por pelo menos o tempo mínimo
      const elapsedTime = Date.now() - startTime
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime)

      if (remainingTime > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingTime))
      }

      loading.value = false
    }
  }

  const proximaPagina = async () => {
    if (paginacao.value.paginaAtual < paginacao.value.totalDePaginas) {
      await carregarAgendamentos({
        paginaAtual: paginacao.value.paginaAtual + 1,
        ordenacao: ordenacao.value,
        busca: busca.value
      })
    }
  }

  const paginaAnterior = async () => {
    if (paginacao.value.paginaAtual > 1) {
      await carregarAgendamentos({
        paginaAtual: paginacao.value.paginaAtual - 1,
        ordenacao: ordenacao.value,
        busca: busca.value
      })
    }
  }

  const alternarOrdenacao = async () => {
    const novaOrdenacao = ordenacao.value === 'DESC' ? 'ASC' : 'DESC'
    await carregarAgendamentos({
      ordenacao: novaOrdenacao,
      paginaAtual: 1,
      busca: busca.value
    })
  }

  const irParaPagina = async numeroPagina => {
    if (numeroPagina >= 1 && numeroPagina <= paginacao.value.totalDePaginas) {
      await carregarAgendamentos({
        paginaAtual: numeroPagina,
        ordenacao: ordenacao.value,
        busca: busca.value
      })
    }
  }

  const buscar = async termoBusca => {
    await carregarAgendamentos({
      busca: termoBusca,
      paginaAtual: 1,
      ordenacao: ordenacao.value
    })
  }

  const temProximaPagina = computed(() => {
    return paginacao.value.next_page_url !== null
  })

  const temPaginaAnterior = computed(() => {
    return paginacao.value.prev_page_url !== null
  })

  const ordenacaoLabel = computed(() => {
    return ordenacao.value === 'DESC' ? 'Mais recentes' : 'Mais antigos'
  })

  return {
    agendamentos,
    paginacao,
    ordenacao,
    ordenacaoLabel,
    busca,
    loading,
    error,
    carregarAgendamentos,
    proximaPagina,
    paginaAnterior,
    irParaPagina,
    alternarOrdenacao,
    buscar,
    temProximaPagina,
    temPaginaAnterior
  }
}
