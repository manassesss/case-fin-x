<template>
  <div class="agendamentos-view">
    <AgendamentosList />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AgendamentosList from '../components/AgendamentosList.vue'

const route = useRoute()

// Exemplo de uso do route para acessar informações da rota
onMounted(() => {
  // Pode ser usado para analytics, tracking, etc.
  console.log('Rota atual:', route.name)
  console.log('Parâmetros da rota:', route.params)
  console.log('Query params:', route.query)
})
</script>

<style scoped>
.agendamentos-view {
  min-height: 100vh;
  background-color: #f5f5f5;
}
</style>
