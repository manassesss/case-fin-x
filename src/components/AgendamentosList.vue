<template>
  <div class="min-h-screen bg-white p-4 sm:p-6 lg:p-8 w-full">
    <div class="max-w-7xl mx-auto w-full">
      <!-- Header -->
      <div class="mb-6 sm:mb-8">
        <div class="flex flex-col items-center gap-4">
          <img
            src="/group.webp"
            alt="Logo"
            class="w-20 h-20 sm:w-24 sm:h-24 object-contain flex-shrink-0"
          />
          <div class="text-center">
            <h1 class="text-2xl sm:text-3xl font-bold text-finx-dark leading-tight mb-2 m-0">
              Agendamentos Cirúrgicos
            </h1>
            <p class="text-text text-sm sm:text-base m-0">Gerencie e visualize todos os agendamentos</p>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-20">
        <div
          class="inline-block w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin"
        ></div>
        <!-- <p class="text-text mt-4">Carregando agendamentos...</p> -->
      </div>

      <!-- Error State -->
      <div v-if="error" class="flex flex-col items-center justify-center py-12 px-4 mb-6">
        <div class="bg-red-50 border-2 border-red-200 rounded-xl p-8 max-w-md w-full text-center">
          <!-- Error Icon -->
          <div class="mb-4 flex justify-center">
            <svg
              class="w-20 h-20 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <!-- Error Message -->
          <h2 class="text-xl font-bold text-red-700 mb-2">Erro no Servidor</h2>
          <p class="text-red-600 text-sm mb-4">{{ error }}</p>
          <!-- Retry Button -->
          <button
            @click="carregarAgendamentos()"
            class="mt-4 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg"
          >
            Tentar Novamente
          </button>
        </div>
      </div>

      <!-- Filters Card -->
      <div
        v-if="!loading && !error"
        class="bg-finx-gray-light rounded-xl p-4 sm:p-6 mb-6 border border-gray-200 w-full"
      >
        <div class="flex flex-col gap-4">
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex-1">
              <label class="block text-sm font-medium text-secondary mb-2">
                Buscar por médico ou paciente
              </label>
              <input
                v-model="searchTerm"
                type="text"
                placeholder="Digite o nome..."
                class="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-finx-dark text-sm transition-all placeholder:text-finx-gray-1 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                @keyup.enter="aplicarFiltros"
              />
            </div>

            <div class="w-full md:w-48 md:min-w-48">
              <label class="block text-sm font-medium text-secondary mb-2"> Ordenar por data de criação </label>
              <select
                v-model="ordenacaoSelecionada"
                @change="aplicarOrdenacao"
                class="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-finx-dark text-sm transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
              >
                <option value="DESC">Mais recente</option>
                <option value="ASC">Mais antigo</option>
              </select>
            </div>

            <div class="flex items-end gap-2 w-full md:w-auto">
              <button
                @click="limparFiltros"
                class="w-full md:w-auto px-4 sm:px-6 py-2.5 bg-white border border-gray-300 hover:border-gray-400 text-secondary font-medium rounded-lg transition-all hover:bg-finx-gray-light text-sm sm:text-base"
              >
                Limpar
              </button>
              <button
                @click="aplicarFiltros"
                class="w-full md:w-auto px-4 sm:px-6 py-2.5 bg-gradient-to-r from-primary to-finx-blue-1 hover:from-finx-blue-2 hover:to-finx-blue-1 text-white font-medium rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/25 text-sm sm:text-base"
              >
                Pesquisar
              </button>
            </div>
          </div>

          <div class="flex flex-col md:flex-row gap-4">
            <div class="w-full md:w-48">
              <label class="block text-sm font-medium text-secondary mb-2">
                Data do Agendamento
              </label>
              <input
                v-model="dataAgendamentoFiltro"
                type="date"
                class="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-finx-dark text-sm transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div class="w-full md:w-48">
              <label class="block text-sm font-medium text-secondary mb-2"> Data de Criação </label>
              <input
                v-model="dataCriacaoFiltro"
                type="date"
                class="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-finx-dark text-sm transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination Top -->
      <div
        v-if="!loading && !error && agendamentos.length > 0"
        class="flex flex-col sm:flex-row items-center justify-end gap-4 rounded-xl p-4 sm:p-6 w-full"
      >
        <div class="text-text text-sm">
          {{ agendamentos.length }} de {{ paginacao.totalDeItens }}
        </div>

        <div class="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">
          <button
            @click="irParaPrimeiraPagina"
            :disabled="paginacao.paginaAtual === 1"
            class="px-2.5 sm:px-3 py-2 rounded-lg bg-white text-secondary border border-gray-200 cursor-pointer transition-all text-sm min-w-[2.5rem] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-finx-gray-light hover:border-primary hover:text-primary disabled:hover:bg-white disabled:hover:border-gray-200 disabled:hover:text-secondary"
          >
            ««
          </button>
          <button
            @click="paginaAnterior"
            :disabled="!temPaginaAnterior"
            class="px-2.5 sm:px-3 py-2 rounded-lg bg-white text-secondary border border-gray-200 cursor-pointer transition-all text-sm min-w-[2.5rem] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-finx-gray-light hover:border-primary hover:text-primary disabled:hover:bg-white disabled:hover:border-gray-200 disabled:hover:text-secondary"
          >
            «
          </button>

          <div class="flex gap-1">
            <button
              v-for="page in paginasVisiveis"
              :key="`top-${page}`"
              @click="irParaPagina(page)"
              :class="[
                'px-3 sm:px-4 py-2 rounded-lg font-medium transition-all text-sm min-w-[2.5rem]',
                paginacao.paginaAtual === page
                  ? 'bg-gradient-to-r from-primary to-finx-blue-1 text-white shadow-lg shadow-primary/25'
                  : 'bg-white text-secondary border border-gray-200 hover:bg-finx-gray-light hover:border-primary hover:text-primary'
              ]"
            >
              {{ page }}
            </button>
          </div>

          <button
            @click="proximaPagina"
            :disabled="!temProximaPagina"
            class="px-2.5 sm:px-3 py-2 rounded-lg bg-white text-secondary border border-gray-200 cursor-pointer transition-all text-sm min-w-[2.5rem] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-finx-gray-light hover:border-primary hover:text-primary disabled:hover:bg-white disabled:hover:border-gray-200 disabled:hover:text-secondary"
          >
            »
          </button>
          <button
            @click="irParaUltimaPagina"
            :disabled="paginacao.paginaAtual === paginacao.totalDePaginas"
            class="px-2.5 sm:px-3 py-2 rounded-lg bg-white text-secondary border border-gray-200 cursor-pointer transition-all text-sm min-w-[2.5rem] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-finx-gray-light hover:border-primary hover:text-primary disabled:hover:bg-white disabled:hover:border-gray-200 disabled:hover:text-secondary"
          >
            »»
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="!loading && !error && agendamentos.length === 0"
        class="text-center py-20 px-5 bg-finx-gray-light rounded-xl border border-gray-200"
      >
        <p class="text-text text-lg m-0">Nenhum agendamento encontrado.</p>
      </div>

      <!-- Scheduling Table -->
      <div
        v-if="!loading && !error && agendamentos.length > 0"
        class="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6 shadow-sm"
      >
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-finx-gray-light border-b border-gray-200">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                  Médico
                </th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                  Paciente
                </th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                  Idade
                </th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                  Data do Agendamento
                </th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                  Data de Criação
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="agendamento in agendamentos"
                :key="agendamento.id"
                class="hover:bg-finx-gray-light/50 transition-colors"
              >
                <td class="px-4 py-4 whitespace-nowrap">
                  <div class="flex items-center gap-3">
                    <div
                      v-if="agendamento.medico.imagem"
                      class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/30"
                    >
                      <img
                        :src="agendamento.medico.imagem"
                        :alt="agendamento.medico.nome"
                        class="w-full h-full object-cover"
                      />
                    </div>
                    <div
                      v-else
                      class="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-finx-blue-1 flex items-center justify-center text-white font-bold text-base flex-shrink-0"
                    >
                      {{ agendamento.medico.nome.charAt(0) }}
                    </div>
                    <div>
                      <div class="text-sm font-semibold text-finx-dark">
                        {{ agendamento.medico.nome }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-4 whitespace-nowrap">
                  <div class="text-sm text-secondary">{{ agendamento.paciente.nome }}</div>
                </td>
                <td class="px-4 py-4 whitespace-nowrap">
                  <div class="text-sm text-secondary">
                    {{ calcularIdade(agendamento.paciente.dataNascimento) }} anos
                  </div>
                </td>
                <td class="px-4 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-finx-dark">
                    {{ formatarData(agendamento.dataAgendamento) }}
                  </div>
                </td>
                <td class="px-4 py-4 whitespace-nowrap">
                  <div class="text-sm text-secondary">
                    {{ formatarData(agendamento.dataCriacao) }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Pagination -->
      <div
        v-if="!loading && !error && agendamentos.length > 0"
        class="flex flex-col sm:flex-row items-center justify-end gap-4 rounded-xl p-4 sm:p-6 w-full"
      >
        <div class="text-text text-sm">
          {{ agendamentos.length }} de {{ paginacao.totalDeItens }}
        </div>

        <div class="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">
          <button
            @click="irParaPrimeiraPagina"
            :disabled="paginacao.paginaAtual === 1"
            class="px-2.5 sm:px-3 py-2 rounded-lg bg-white text-secondary border border-gray-200 cursor-pointer transition-all text-sm min-w-[2.5rem] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-finx-gray-light hover:border-primary hover:text-primary disabled:hover:bg-white disabled:hover:border-gray-200 disabled:hover:text-secondary"
          >
            ««
          </button>
          <button
            @click="paginaAnterior"
            :disabled="!temPaginaAnterior"
            class="px-2.5 sm:px-3 py-2 rounded-lg bg-white text-secondary border border-gray-200 cursor-pointer transition-all text-sm min-w-[2.5rem] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-finx-gray-light hover:border-primary hover:text-primary disabled:hover:bg-white disabled:hover:border-gray-200 disabled:hover:text-secondary"
          >
            «
          </button>

          <div class="flex gap-1">
            <button
              v-for="page in paginasVisiveis"
              :key="page"
              @click="irParaPagina(page)"
              :class="[
                'px-3 sm:px-4 py-2 rounded-lg font-medium transition-all text-sm min-w-[2.5rem]',
                paginacao.paginaAtual === page
                  ? 'bg-gradient-to-r from-primary to-finx-blue-1 text-white shadow-lg shadow-primary/25'
                  : 'bg-white text-secondary border border-gray-200 hover:bg-finx-gray-light hover:border-primary hover:text-primary'
              ]"
            >
              {{ page }}
            </button>
          </div>

          <button
            @click="proximaPagina"
            :disabled="!temProximaPagina"
            class="px-2.5 sm:px-3 py-2 rounded-lg bg-white text-secondary border border-gray-200 cursor-pointer transition-all text-sm min-w-[2.5rem] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-finx-gray-light hover:border-primary hover:text-primary disabled:hover:bg-white disabled:hover:border-gray-200 disabled:hover:text-secondary"
          >
            »
          </button>
          <button
            @click="irParaUltimaPagina"
            :disabled="paginacao.paginaAtual === paginacao.totalDePaginas"
            class="px-2.5 sm:px-3 py-2 rounded-lg bg-white text-secondary border border-gray-200 cursor-pointer transition-all text-sm min-w-[2.5rem] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-finx-gray-light hover:border-primary hover:text-primary disabled:hover:bg-white disabled:hover:border-gray-200 disabled:hover:text-secondary"
          >
            »»
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useAgendamentos } from '../composables/useAgendamentos.js'
import { calcularIdade, formatarData } from '../utils/dateUtils.js'

const {
  agendamentos,
  paginacao,
  ordenacao,
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
} = useAgendamentos()

const searchTerm = ref('')
const ordenacaoSelecionada = ref('DESC')

// Calcular páginas visíveis
const paginasVisiveis = computed(() => {
  const pages = []
  const maxVisible = 5
  const totalPages = paginacao.value.totalDePaginas
  const currentPage = paginacao.value.paginaAtual

  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages, start + maxVisible - 1)

  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

const aplicarFiltros = async () => {
  const dataCriacaoParam =
    dataCriacaoFiltro.value && dataCriacaoFiltro.value.trim() !== ''
      ? dataCriacaoFiltro.value.trim()
      : null
  const dataAgendamentoParam =
    dataAgendamentoFiltro.value && dataAgendamentoFiltro.value.trim() !== ''
      ? dataAgendamentoFiltro.value.trim()
      : null


  await carregarAgendamentos({
    busca: searchTerm.value,
    dataCriacao: dataCriacaoParam,
    dataAgendamento: dataAgendamentoParam,
    paginaAtual: 1,
    ordenacao: ordenacao.value
  })
}

const limparFiltros = async () => {
  searchTerm.value = ''
  dataCriacaoFiltro.value = ''
  dataAgendamentoFiltro.value = ''
  await carregarAgendamentos({
    busca: '',
    dataCriacao: null,
    dataAgendamento: null,
    paginaAtual: 1,
    ordenacao: ordenacao.value
  })
}

const aplicarOrdenacao = async () => {
  if (ordenacaoSelecionada.value !== ordenacao.value) {
    await alternarOrdenacao()
  }
}

const irParaPrimeiraPagina = () => {
  irParaPagina(1)
}

const irParaUltimaPagina = () => {
  irParaPagina(paginacao.value.totalDePaginas)
}

// Sincronizar ordenação e busca selecionada com o estado
watch(
  () => ordenacao.value,
  newVal => {
    ordenacaoSelecionada.value = newVal
  }
)

watch(
  () => busca.value,
  newVal => {
    searchTerm.value = newVal
  }
)

onMounted(() => {
  carregarAgendamentos()
})
</script>
