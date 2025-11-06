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
  const dataCriacaoFiltro = ref('') // Filtro por data de criação
  const dataAgendamentoFiltro = ref('') // Filtro por data de agendamento
  const loading = ref(false)
  const error = ref(null)

  const carregarAgendamentos = async (params = {}) => {
    loading.value = true
    error.value = null

    // Delay mínimo para melhorar a experiência visual (1.2 segundos)
    const minLoadingTime = 1200
    const startTime = Date.now()

    try {
      // Se a ordenação, busca, datas ou itensPorPagina foi alterada, volta para a primeira página
      if (
        (params.ordenacao && params.ordenacao !== ordenacao.value) ||
        (params.busca !== undefined && params.busca !== busca.value) ||
        (params.dataCriacao !== undefined && params.dataCriacao !== dataCriacaoFiltro.value) ||
        (params.dataAgendamento !== undefined &&
          params.dataAgendamento !== dataAgendamentoFiltro.value) ||
        (params.itensPorPagina && params.itensPorPagina !== paginacao.value.itensPorPagina)
      ) {
        params.paginaAtual = 1
      }

      const ordenacaoAtual = params.ordenacao || ordenacao.value
      const buscaAtual = params.busca !== undefined ? params.busca : busca.value
      const dataCriacaoAtual =
        params.dataCriacao !== undefined ? params.dataCriacao : dataCriacaoFiltro.value
      const dataAgendamentoAtual =
        params.dataAgendamento !== undefined ? params.dataAgendamento : dataAgendamentoFiltro.value
      const itensPorPaginaAtual = params.itensPorPagina || paginacao.value.itensPorPagina

      // Normalizar os valores de data - enviar null se vazio, senão enviar a string
      const dataCriacaoParam =
        dataCriacaoAtual && typeof dataCriacaoAtual === 'string' && dataCriacaoAtual.trim() !== ''
          ? dataCriacaoAtual.trim()
          : null
      const dataAgendamentoParam =
        dataAgendamentoAtual &&
        typeof dataAgendamentoAtual === 'string' &&
        dataAgendamentoAtual.trim() !== ''
          ? dataAgendamentoAtual.trim()
          : null

      const response = await buscarAgendamentos({
        paginaAtual: params.paginaAtual || paginacao.value.paginaAtual,
        itensPorPagina: itensPorPaginaAtual,
        dataCriacao: dataCriacaoParam,
        dataAgendamento: dataAgendamentoParam,
        busca: buscaAtual || null,
        ordenacao: ordenacaoAtual
      })

      paginacao.value.itensPorPagina = itensPorPaginaAtual

      agendamentos.value = response.data || []
      paginacao.value = response.paginacao || paginacao.value
      ordenacao.value = ordenacaoAtual
      busca.value = buscaAtual
      dataCriacaoFiltro.value = dataCriacaoAtual
      dataAgendamentoFiltro.value = dataAgendamentoAtual
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
        busca: busca.value,
        dataCriacao: dataCriacaoFiltro.value,
        dataAgendamento: dataAgendamentoFiltro.value
      })
    }
  }

  const paginaAnterior = async () => {
    if (paginacao.value.paginaAtual > 1) {
      await carregarAgendamentos({
        paginaAtual: paginacao.value.paginaAtual - 1,
        ordenacao: ordenacao.value,
        busca: busca.value,
        dataCriacao: dataCriacaoFiltro.value,
        dataAgendamento: dataAgendamentoFiltro.value
      })
    }
  }

  const alternarOrdenacao = async () => {
    const novaOrdenacao = ordenacao.value === 'DESC' ? 'ASC' : 'DESC'
    await carregarAgendamentos({
      ordenacao: novaOrdenacao,
      paginaAtual: 1,
      busca: busca.value,
      dataCriacao: dataCriacaoFiltro.value,
      dataAgendamento: dataAgendamentoFiltro.value
    })
  }

  const irParaPagina = async numeroPagina => {
    if (numeroPagina >= 1 && numeroPagina <= paginacao.value.totalDePaginas) {
      await carregarAgendamentos({
        paginaAtual: numeroPagina,
        ordenacao: ordenacao.value,
        busca: busca.value,
        dataCriacao: dataCriacaoFiltro.value,
        dataAgendamento: dataAgendamentoFiltro.value
      })
    }
  }

  const buscar = async termoBusca => {
    await carregarAgendamentos({
      busca: termoBusca,
      paginaAtual: 1,
      ordenacao: ordenacao.value,
      dataCriacao: dataCriacaoFiltro.value,
      dataAgendamento: dataAgendamentoFiltro.value
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
    dataCriacaoFiltro,
    dataAgendamentoFiltro,
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
